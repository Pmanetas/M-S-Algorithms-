use yew::prelude::*;
use yew_router::prelude::*;
use gloo_timers::callback::Timeout;
use crate::{Route, services::auth::AuthService, types::UserInfo};
use stylist::yew::styled_component;

#[styled_component(Dashboard)]
pub fn dashboard() -> Html {
    let navigator = use_navigator().unwrap();
    let auth_service = AuthService::new();
    let user_info = use_state(|| UserInfo {
        username: String::new(),
        logged_in: false,
    });
    let is_loading = use_state(|| true);
    let show_praxis = use_state(|| false);
    let show_logout = use_state(|| false);

    // Check authentication on component mount
    {
        let user_info = user_info.clone();
        let is_loading = is_loading.clone();
        let navigator = navigator.clone();
        let auth_service = auth_service.clone();
        let show_praxis = show_praxis.clone();
        let show_logout = show_logout.clone();
        
        use_effect_with((), move |_| {
            wasm_bindgen_futures::spawn_local(async move {
                match auth_service.check_auth().await {
                    Ok(user) => {
                        if user.logged_in {
                            user_info.set(user);
                            is_loading.set(false);
                            
                            // Start animations
                            Timeout::new(500, {
                                let show_praxis = show_praxis.clone();
                                move || show_praxis.set(true)
                            }).forget();
                            
                            Timeout::new(1500, {
                                let show_logout = show_logout.clone();
                                move || show_logout.set(true)
                            }).forget();
                        } else {
                            navigator.push(&Route::Login);
                        }
                    }
                    Err(_) => {
                        navigator.push(&Route::Login);
                    }
                }
            });
            || ()
        });
    }

    let on_logout = {
        let auth_service = auth_service.clone();
        let navigator = navigator.clone();
        
        Callback::from(move |_| {
            let auth_service = auth_service.clone();
            let navigator = navigator.clone();
            
            wasm_bindgen_futures::spawn_local(async move {
                let _ = auth_service.logout().await;
                
                // Create smooth logout transition
                if let Some(body) = web_sys::window()
                    .and_then(|w| w.document())
                    .and_then(|d| d.body())
                {
                    let _ = body.style().set_property("transition", "opacity 0.5s ease");
                    let _ = body.style().set_property("opacity", "0");
                }
                
                // Redirect after fade
                Timeout::new(500, move || {
                    navigator.push(&Route::Login);
                }).forget();
            });
        })
    };

    let css = css!(
        r#"
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background-color: #000000;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: white;
        }

        .dashboard-container {
            min-height: 100vh;
            position: relative;
            background-color: #000000;
        }

        .praxis-logo {
            position: absolute;
            top: 20px;
            left: 20px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.2rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.7);
            letter-spacing: 0.1em;
            opacity: 0;
            transform: translateY(50px);
            transition: all 2s ease-out;
        }

        .praxis-logo.show {
            opacity: 0.7;
            transform: translateY(0);
        }

        .logout-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: rgba(255, 255, 255, 0.7);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(50px);
        }

        .logout-btn.show {
            opacity: 1;
            transform: translateY(0);
        }

        .logout-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
            color: rgba(255, 255, 255, 0.9);
        }

        .dashboard-content {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
        }

        .welcome-message {
            text-align: center;
            font-size: 1.5rem;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: 0.05em;
        }

        .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #000000;
        }

        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            border-top-color: rgba(255, 255, 255, 0.5);
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        "#
    );

    if *is_loading {
        return html! {
            <div class={classes!(css, "loading-container")}>
                <div class="loading-spinner"></div>
            </div>
        };
    }

    html! {
        <div class={classes!(css, "dashboard-container")}>
            <div class={classes!("praxis-logo", show_praxis.then_some("show"))}>
                {"PRAXIS 1.0"}
            </div>
            
            <button 
                class={classes!("logout-btn", show_logout.then_some("show"))}
                onclick={on_logout}
            >
                {"Logout"}
            </button>
            
            <div class="dashboard-content">
                <div class="welcome-message">
                    {format!("Welcome, {}", user_info.username)}
                </div>
            </div>
        </div>
    }
} 