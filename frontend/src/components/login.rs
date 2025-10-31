use yew::prelude::*;
use yew_router::prelude::*;
use web_sys::HtmlInputElement;
use wasm_bindgen::JsCast;
use gloo_timers::callback::Timeout;
use crate::{Route, services::auth::AuthService};
use stylist::yew::styled_component;

#[styled_component(Login)]
pub fn login() -> Html {
    let navigator = use_navigator().unwrap();
    let auth_service = AuthService::new();
    
    let username_ref = use_node_ref();
    let password_ref = use_node_ref();
    let error_message = use_state(|| None::<String>);
    let is_loading = use_state(|| false);
    let is_animating = use_state(|| false);
    
    let onsubmit = {
        let username_ref = username_ref.clone();
        let password_ref = password_ref.clone();
        let error_message = error_message.clone();
        let is_loading = is_loading.clone();
        let is_animating = is_animating.clone();
        let navigator = navigator.clone();
        let auth_service = auth_service.clone();
        
        Callback::from(move |e: SubmitEvent| {
            e.prevent_default();
            
            let username = username_ref
                .cast::<HtmlInputElement>()
                .map(|input| input.value().trim().to_string())
                .unwrap_or_default();
                
            let password = password_ref
                .cast::<HtmlInputElement>()
                .map(|input| input.value())
                .unwrap_or_default();
            
            if username.is_empty() || password.is_empty() {
                error_message.set(Some("Please fill in all fields".to_string()));
                return;
            }
            
            is_loading.set(true);
            error_message.set(None);
            
            let username = username.clone();
            let password = password.clone();
            let error_message = error_message.clone();
            let is_loading = is_loading.clone();
            let is_animating = is_animating.clone();
            let navigator = navigator.clone();
            let auth_service = auth_service.clone();
            let password_ref = password_ref.clone();
            
            wasm_bindgen_futures::spawn_local(async move {
                match auth_service.login(username, password).await {
                    Ok(response) => {
                        is_loading.set(false);
                        if response.success {
                            // Start login animation
                            is_animating.set(true);
                            
                            // After animation completes, navigate to dashboard
                            let navigator = navigator.clone();
                            Timeout::new(4000, move || {
                                navigator.push(&Route::Dashboard);
                            }).forget();
                        } else {
                            error_message.set(Some(response.message));
                            // Clear password field
                            if let Some(input) = password_ref.cast::<HtmlInputElement>() {
                                input.set_value("");
                            }
                        }
                    }
                    Err(_) => {
                        is_loading.set(false);
                        error_message.set(Some("Network error. Please try again.".to_string()));
                        // Clear password field
                        if let Some(input) = password_ref.cast::<HtmlInputElement>() {
                            input.set_value("");
                        }
                    }
                }
            });
        })
    };

    let css = css!(
        r#"
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: hidden;
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            position: relative;
            transition: all 0.5s ease;
        }

        .container.animating {
            background-color: #000000;
        }

        .praxis {
            position: absolute;
            top: 20px;
            left: 20px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.2rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.7);
            letter-spacing: 0.1em;
            z-index: 100;
            transition: all 2s ease;
        }

        .praxis.animating {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            z-index: 1000;
            opacity: 1;
            animation: fizzleOut 4s ease-out forwards;
        }

        @keyframes fizzleOut {
            0% {
                opacity: 1;
                filter: blur(0px);
                text-shadow: none;
                letter-spacing: 0.1em;
            }
            50% {
                opacity: 1;
                filter: blur(5px);
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
                letter-spacing: 0.3em;
            }
            70% {
                opacity: 0.3;
                filter: blur(10px);
                text-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
                letter-spacing: 0.5em;
            }
            100% {
                opacity: 0;
                filter: blur(15px);
                text-shadow: 0 0 60px rgba(255, 255, 255, 0.2);
                letter-spacing: 0.7em;
            }
        }

        .login-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            width: 100%;
            max-width: 400px;
            margin: 2rem;
            transition: opacity 0.5s ease;
        }

        .login-container.animating {
            opacity: 0;
        }

        .login-form h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: #2d3748;
            font-weight: 600;
            font-size: 1.5rem;
        }

        .input-group {
            margin-bottom: 1.5rem;
            position: relative;
        }

        .input-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #4a5568;
            font-weight: 500;
            font-size: 0.9rem;
        }

        .input-group input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.8);
            box-sizing: border-box;
        }

        .input-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            background: rgba(255, 255, 255, 1);
        }

        .login-btn {
            width: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 0.875rem 1.5rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
        }

        .login-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .login-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .error-message {
            background: #fed7d7;
            color: #c53030;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            border: 1px solid #feb2b2;
            font-size: 0.9rem;
        }

        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #ffffff;
            animation: spin 0.8s ease-in-out infinite;
            margin-right: 8px;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        "#
    );

    html! {
        <div class={classes!(css, "container", is_animating.then_some("animating"))}>
            <div class={classes!("praxis", is_animating.then_some("animating"))}>
                {"PRAXIS 1.0"}
            </div>
            
            <main class={classes!("login-container", is_animating.then_some("animating"))}>
                <div class="login-form">
                    <h2>{"Portal Access"}</h2>
                    <form {onsubmit}>
                        <div class="input-group">
                            <label for="username">{"Key"}</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                ref={username_ref}
                                required=true
                                disabled={*is_loading}
                            />
                        </div>
                        
                        <div class="input-group">
                            <label for="password">{"Password"}</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                ref={password_ref}
                                required=true
                                disabled={*is_loading}
                            />
                        </div>
                        
                        <button type="submit" class="login-btn" disabled={*is_loading}>
                            {if *is_loading {
                                html! {
                                    <>
                                        <span class="loading-spinner"></span>
                                        {"Authenticating..."}
                                    </>
                                }
                            } else {
                                html! { "Login" }
                            }}
                        </button>
                    </form>
                    
                    {if let Some(error) = error_message.as_ref() {
                        html! {
                            <div class="error-message">
                                {error}
                            </div>
                        }
                    } else {
                        html! {}
                    }}
                </div>
            </main>
        </div>
    }
} 