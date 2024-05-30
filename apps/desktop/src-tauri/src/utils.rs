use std::error::Error;
use std::process::Command;

pub fn run_applescript_sync(
    script: &str,
    args: Option<&[String]>,
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

    let mut command = Command::new("osascript");
    command.args(["-e", script]);
    command.args(&output_arguments);

    // Add the arguments to the command
    if let Some(arguments) = args {
        for arg in arguments {
            command.arg(arg);
        }
    }

    let output = command.output()?;

    Ok(String::from_utf8_lossy(&output.stdout).trim().to_string())
}
