use std::error::Error;
use std::process::Command;

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
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
