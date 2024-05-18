#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod hello;

use std::{
    boxed,
    sync::Mutex,
    thread,
    time::{SystemTime, UNIX_EPOCH},
};

use actix_web::{
    get, middleware, post,
    web::{self, Data},
    App, HttpResponse, HttpServer, Responder,
};

use window_shadows::set_shadow;

use serde::{Deserialize, Serialize};
use serde_json::json;

use rusqlite::{Connection, ParamsFromIter, Result, ToSql};

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

struct AppState {
    app_name: String,
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
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello, World!")
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

// This struct represents state

#[actix_web::main]
pub async fn start_server(app: AppHandle, conn: Connection) -> std::io::Result<()> {
    // let tauri_app = web::Data::new(Mutex::new(app));

    // let db = web::Data::new(Mutex::new(conn));

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(AppState {
                app_name: String::from("Actix Web"),
            }))
            .app_data(web::Data::new(app.clone()))
            // .app_data(db.clone())
            .wrap(middleware::Logger::default())
            .service(index)
            .service(open_window)
            .service(upsert_extension)
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

            thread::spawn(move || start_server(*boxed_handle, *boxed_conn).unwrap());

            let window = app.get_window("main").unwrap();

            // set_shadow(&window, true).expect("Unsupported platform!");

            #[cfg(target_os = "macos")]
            window.set_transparent_titlebar(true, true);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
