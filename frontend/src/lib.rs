use yew::prelude::*;
use yew_router::prelude::*;

mod components;
mod services;
mod types;

use components::{login::Login, dashboard::Dashboard};
use services::auth::AuthService;
use types::UserInfo;

#[derive(Clone, Routable, PartialEq)]
enum Route {
    #[at("/")]
    Login,
    #[at("/dashboard")]
    Dashboard,
}

fn switch(routes: Route) -> Html {
    match routes {
        Route::Login => html! { <Login /> },
        Route::Dashboard => html! { <Dashboard /> },
    }
}

#[function_component(App)]
fn app() -> Html {
    let user_state = use_state(|| UserInfo {
        username: String::new(),
        logged_in: false,
    });

    let auth_service = AuthService::new();
    
    // Check authentication status on app start
    {
        let user_state = user_state.clone();
        let auth_service = auth_service.clone();
        
        use_effect_with((), move |_| {
            wasm_bindgen_futures::spawn_local(async move {
                if let Ok(user_info) = auth_service.check_auth().await {
                    user_state.set(user_info);
                }
            });
            || ()
        });
    }

    html! {
        <BrowserRouter>
            <Switch<Route> render={switch} />
        </BrowserRouter>
    }
}

#[wasm_bindgen::prelude::wasm_bindgen(start)]
pub fn run_app() {
    yew::Renderer::<App>::new().render();
} 