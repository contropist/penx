#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod hello;

use std::cell::RefCell;

use std::{
    boxed,
    sync::Mutex,
    thread,
    time::{SystemTime, UNIX_EPOCH},
};

use actix_web::{get, middleware, post, web, App, HttpResponse, HttpServer, Responder};

use window_shadows::set_shadow;

use serde::{Deserialize, Serialize};
use serde_json::json;

use rusqlite::{Connection, ParamsFromIter, Result, ToSql};

use std::error::Error;
use std::process::{Command, Output};
use tauri::{
    AppHandle, CustomMenuItem, LogicalSize, Manager, Runtime, Size, SystemTray, SystemTrayEvent,
    SystemTrayMenu, SystemTrayMenuItem, Window,
};

#[cfg(target_os = "macos")]
use cocoa::appkit::{NSWindow, NSWindowButton, NSWindowStyleMask, NSWindowTitleVisibility};

#[cfg(target_os = "macos")]
use objc::runtime::YES;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

#[derive(Clone)]
struct AppState {
    app_name: String,
    data: String,
    // app_name: RefCell<String>,
    // data: RefCell<String>,
}

// #[derive(Serialize)]
#[derive(Clone, serde::Serialize)]
struct ExtensionInfo {
    id: String,
    name: String,
    version: String,
    icon: String,
    assets: String,
    commands: String,
}

#[derive(Deserialize)]
struct UpsertExtensionInput {
    id: String,
    name: String,
    version: String,
    icon: String,
    assets: String,
    commands: String,
}

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

fn create_system_tray() -> SystemTray {
    let quit = CustomMenuItem::new("Quit".to_string(), "Quit");
    let show = CustomMenuItem::new("Show".to_string(), "Show");
    let hide = CustomMenuItem::new("Hide".to_string(), "Hide");
    let preferences = CustomMenuItem::new("Preferences".to_string(), "Preferences");
    let tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_item(hide)
        .add_item(preferences)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    SystemTray::new().with_menu(tray_menu)
}

pub fn run_applescript_sync(
    script: &str,
    human_readable_output: bool,
) -> Result<String, Box<dyn Error>> {
    if cfg!(not(target_os = "macos")) {
        return Err("macOS only".into());
    }

    let output_arguments = if human_readable_output {
        Vec::new()
    } else {
        vec!["-ss"]
    };

    let output = Command::new("osascript")
        .args(["-e", script])
        .args(&output_arguments)
        .output()?;

    Ok(String::from_utf8_lossy(&output.stdout).trim().to_string())
}

#[tauri::command]
async fn run_applescript(script: &str) -> Result<String, String> {
    match run_applescript_sync(script, true) {
        Ok(output) => Ok(output),
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
fn on_button_clicked() -> String {
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_millis();
    format!("on_button_clicked called from Rust! (timestamp: {since_the_epoch}ms)")
}

#[tauri::command]
fn greet(name: &str) {
    hello::say_hello(name)
}

#[tauri::command]
fn set_window_properties(window: Window, resizable: bool, width: f64, height: f64, focus: bool) {
    window.set_resizable(resizable).unwrap();
    window
        .set_size(Size::Logical(LogicalSize { width, height }))
        .unwrap();

    let _ = window.center();

    if focus {
        window.set_focus().unwrap();
    }
}

#[get("/")]
async fn index(app_state: web::Data<AppState>) -> impl Responder {
    let data = &app_state.app_name;
    HttpResponse::Ok().body(format!("Hello, World! {}", data))
}

#[get("/open-window")]
async fn open_window(app: web::Data<AppHandle>) -> impl Responder {
    let window = app.get_window("main").unwrap();
    window.emit("OPEN_WINDOW", Some("Yes")).unwrap();
    HttpResponse::Ok().body("Open window!")
}

#[post("/api/upsert-extension")]
async fn upsert_extension(
    input: web::Json<UpsertExtensionInput>,
    app: web::Data<AppHandle>,
) -> HttpResponse {
    let info = ExtensionInfo {
        id: input.id.to_string(),
        name: input.name.to_string(),
        version: input.version.to_string(),
        icon: input.icon.to_string(),
        assets: input.assets.to_string(),
        commands: input.commands.to_string(),
    };

    let window = app.get_window("main").unwrap();
    window.emit("UPSERT_EXTENSION", json!(info)).unwrap();

    HttpResponse::Ok().json(info)
}

#[derive(Deserialize)]
struct QueryParams {
    extension_id: String,
}

#[get("/extension")]
async fn extension(web::Query(params): web::Query<QueryParams>) -> impl Responder {
    let html = format!(
        r#"
        <!DOCTYPE html>
        <html>
          <body>
            <div id="root" style="color: red">Root</div>
            <script src="./dist/{}.js"></script>
            <script src="/extension_js/hello.js"></script>
          </body>
        </html>
    "#,
        params.extension_id
    );

    HttpResponse::Ok().body(html)
}

#[get("/extension_js/{name}.js")] // <- define path parameters
async fn extension_js(path: web::Path<(String)>) -> impl Responder {
    let js_str = "console.log(\"hello world....\");alert(123);";

    HttpResponse::Ok()
        .content_type("application/javascript")
        .body(js_str)
}

#[get("/get-data")]
async fn get_data(app: web::Data<AppHandle>) -> impl Responder {
    HttpResponse::Ok().body("Open window!")
}

async fn get_data_from_webview(app_handle: &tauri::AppHandle) -> String {
    let event_name = "get_data_from_rust";
    let (tx, rx) = std::sync::mpsc::channel();
    app_handle.emit_all(event_name, Some("yes")).unwrap();

    let data = rx.recv().unwrap();
    data
}

// This struct represents state

#[actix_web::main]
pub async fn start_server(
    app: AppHandle,
    conn: Connection,
    app_state: AppState,
) -> std::io::Result<()> {
    // let tauri_app = web::Data::new(Mutex::new(app));

    // let db = web::Data::new(Mutex::new(conn));

    HttpServer::new(move || {
        App::new()
            // .app_data(web::Data::new(AppState {
            //     app_name: String::from("Actix Web"),
            //     data: String::from("initial data"),
            //     app_name: RefCell::new("Actix Web".to_string()),
            //     data: RefCell::new("initial data".to_string()),
            // }))
            .app_data(web::Data::new(app_state.clone()))
            .app_data(web::Data::new(app.clone()))
            // .app_data(db.clone())
            .wrap(middleware::Logger::default())
            .service(index)
            .service(open_window)
            .service(upsert_extension)
            .service(extension)
            .service(extension_js)
            .service(get_data)
    })
    .bind(("127.0.0.1", 14159))?
    .run()
    .await
}

pub trait WindowExt {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, title_transparent: bool, remove_toolbar: bool);
}

impl<R: Runtime> WindowExt for Window<R> {
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, title_transparent: bool, remove_tool_bar: bool) {
        unsafe {
            let id = self.ns_window().unwrap() as cocoa::base::id;
            NSWindow::setTitlebarAppearsTransparent_(id, cocoa::base::YES);
            let mut style_mask = id.styleMask();
            style_mask.set(
                NSWindowStyleMask::NSFullSizeContentViewWindowMask,
                title_transparent,
            );

            id.setStyleMask_(style_mask);

            if remove_tool_bar {
                let close_button = id.standardWindowButton_(NSWindowButton::NSWindowCloseButton);
                let _: () = msg_send![close_button, setHidden: YES];
                let min_button =
                    id.standardWindowButton_(NSWindowButton::NSWindowMiniaturizeButton);
                let _: () = msg_send![min_button, setHidden: YES];
                let zoom_button = id.standardWindowButton_(NSWindowButton::NSWindowZoomButton);
                let _: () = msg_send![zoom_button, setHidden: YES];
            }

            id.setTitleVisibility_(if title_transparent {
                NSWindowTitleVisibility::NSWindowTitleHidden
            } else {
                NSWindowTitleVisibility::NSWindowTitleVisible
            });

            id.setTitlebarAppearsTransparent_(if title_transparent {
                cocoa::base::YES
            } else {
                cocoa::base::NO
            });
        }
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard::init()) // add this line
        .invoke_handler(tauri::generate_handler![
            on_button_clicked,
            greet,
            run_applescript,
            set_window_properties,
        ])
        .system_tray(create_system_tray())
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "Hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }
                "Show" => {
                    let window = app.get_window("main").unwrap();
                    window.show().unwrap();
                    window.center().unwrap();
                }
                "Preferences" => {
                    let window = app.get_window("main").unwrap();
                    window.emit("PreferencesClicked", Some("Yes")).unwrap();
                    window.show().unwrap();
                    window.center().unwrap();
                }
                "Quit" => {
                    std::process::exit(0);
                }
                _ => {}
            },
            _ => {}
        })
        .setup(|app| {
            let handle = app.handle();
            let conn = Connection::open_in_memory();

            let boxed_handle = Box::new(handle);
            let boxed_conn = Box::new(conn.unwrap());

            let app_state = AppState {
                // app_name: RefCell::new("Actix Web".to_string()),
                // data: RefCell::new("initial data".to_string()),
                app_name: String::from("Actix Web"),
                data: String::from("initial data"),
            };

            app.listen_global("get_data_from_webview", move |event| {
                let data = event.payload().unwrap();
                // *app_state.data.borrow_mut() = data.to_string();
                // *app_state.app_name.borrow_mut() = data.to_string();
            });

            let boxed_app_state = Box::new(app_state);

            thread::spawn(move || {
                start_server(*boxed_handle, *boxed_conn, *boxed_app_state).unwrap()
            });

            let window = app.get_window("main").unwrap();

            set_shadow(&window, true).expect("Unsupported platform!");

            #[cfg(target_os = "macos")]
            window.set_transparent_titlebar(true, true);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
