// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

// pub use tauri_macros::;
use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    Manager, Runtime,
};

pub fn create_tray<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {
    let toggle_i = MenuItem::with_id(app, "toggle", "Toggle", true, None::<&str>)?;
    let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
    let menu1 = Menu::with_items(app, &[&toggle_i, &quit_i])?;
    let _ = TrayIconBuilder::with_id("tray-1")
        .tooltip("Tauri")
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu1)
        .menu_on_left_click(true)
        .on_menu_event(move |app, event| match event.id.as_ref() {
            "quit" => {
                app.exit(0);
            }
            "toggle" => {
                if let Some(window) = app.get_webview_window("main") {
                    let visible = window.is_visible().unwrap();
                    println!("visible: {}", visible);
                    let new_title = if window.is_visible().unwrap_or_default() {
                        let _ = window.hide();
                        "Show"
                    } else {
                        let _ = window.show();
                        let _ = window.set_focus();
                        "Hide"
                    };
                    toggle_i.set_text(new_title).unwrap();
                }
            }
            _ => {}
        })
        .build(app);

    Ok(())
}
