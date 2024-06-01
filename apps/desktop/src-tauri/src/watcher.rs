use home::home_dir;
use notify::{Config, Event, RecommendedWatcher, RecursiveMode, Result, Watcher};
use std::path::Path;
use std::sync::mpsc::channel;
use tauri::{AppHandle, Manager};

pub fn start_watching(app_handle: AppHandle) -> Result<()> {
    // Automatically select the best implementation for your platform.
    let mut watcher = notify::recommended_watcher(|res| match res {
        Ok(event) => println!("event: {:?}", event),
        Err(e) => println!("watch error: {:?}", e),
    })?;

    println!("watch error: {:?}", "start........");

    // Add a path to be watched. All files and directories at that path and
    // below will be monitored for changes.
    watcher.watch(Path::new("/Applications"), RecursiveMode::Recursive)?;

    Ok(())
}
