use tauri::Manager;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Mutex;

#[derive(Debug, Deserialize)]
struct LoginRequest {
    username: String,
    password: String,
}

#[derive(Debug, Serialize)]
struct LoginResponse {
    success: bool,
    message: String,
}

#[derive(Debug, Serialize)]
struct UserInfo {
    username: String,
    logged_in: bool,
}

// Global state for user session
struct AppState {
    logged_in_user: Mutex<Option<String>>,
}

// Valid users (same as your backend)
fn get_valid_users() -> HashMap<String, String> {
    let mut users = HashMap::new();
    users.insert("manetas & stevens associates".to_string(), "123".to_string());
    users.insert("admin".to_string(), "admin123".to_string());
    users.insert("user1".to_string(), "password1".to_string());
    users.insert("user2".to_string(), "password2".to_string());
    users
}

#[tauri::command]
fn login(state: tauri::State<AppState>, request: LoginRequest) -> LoginResponse {
    let valid_users = get_valid_users();
    
    if let Some(stored_password) = valid_users.get(&request.username) {
        if stored_password == &request.password {
            // Successful login
            let mut logged_in_user = state.logged_in_user.lock().unwrap();
            *logged_in_user = Some(request.username.clone());
            
            return LoginResponse {
                success: true,
                message: "Login successful".to_string(),
            };
        }
    }
    
    // Failed login
    LoginResponse {
        success: false,
        message: "Invalid username or password".to_string(),
    }
}

#[tauri::command]
fn logout(state: tauri::State<AppState>) -> LoginResponse {
    let mut logged_in_user = state.logged_in_user.lock().unwrap();
    *logged_in_user = None;
    
    LoginResponse {
        success: true,
        message: "Logged out successfully".to_string(),
    }
}

#[tauri::command]
fn check_auth(state: tauri::State<AppState>) -> UserInfo {
    let logged_in_user = state.logged_in_user.lock().unwrap();
    
    if let Some(username) = logged_in_user.as_ref() {
        UserInfo {
            username: username.clone(),
            logged_in: true,
        }
    } else {
        UserInfo {
            username: "".to_string(),
            logged_in: false,
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(AppState {
            logged_in_user: Mutex::new(None),
        })
        .invoke_handler(tauri::generate_handler![login, logout, check_auth])
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn main() {
    run();
} 