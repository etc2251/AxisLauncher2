
use regex::Regex;
use tauri::Manager;
use tauri_plugin_deep_link::register;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri_plugin_deep_link::prepare("dev.junglefn");
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_notification::init())
        //.plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            register("Flair", move |request| {
                let re = Regex::new(r"jungle://([^/]+)").unwrap();
                if let Err(err) = window.set_focus() {
                    eprintln!("Could not set focus on main window: {:?}", err);
                }

                if let Some(captures) = re.captures(request.as_str()) {
                    if let Some(result) = captures.get(1) {
                        window
                            .eval(&format!("window.location.hash = '{}'", result.as_str()))
                            .unwrap();
                    }
                }
            })
            .unwrap();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
