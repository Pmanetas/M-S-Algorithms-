use gloo_net::http::Request;
use crate::types::{LoginRequest, LoginResponse, UserInfo};

#[derive(Clone)]
pub struct AuthService {
    base_url: String,
}

impl AuthService {
    pub fn new() -> Self {
        Self {
            base_url: "http://127.0.0.1:8080/api".to_string(),
        }
    }

    pub async fn login(&self, username: String, password: String) -> Result<LoginResponse, gloo_net::Error> {
        let login_request = LoginRequest { username, password };
        
        let response = Request::post(&format!("{}/login", self.base_url))
            .header("Content-Type", "application/json")
            .credentials(web_sys::RequestCredentials::Include)
            .json(&login_request)?
            .send()
            .await?;

        response.json::<LoginResponse>().await
    }

    pub async fn logout(&self) -> Result<LoginResponse, gloo_net::Error> {
        let response = Request::post(&format!("{}/logout", self.base_url))
            .credentials(web_sys::RequestCredentials::Include)
            .send()
            .await?;

        response.json::<LoginResponse>().await
    }

    pub async fn check_auth(&self) -> Result<UserInfo, gloo_net::Error> {
        let response = Request::get(&format!("{}/auth", self.base_url))
            .credentials(web_sys::RequestCredentials::Include)
            .send()
            .await?;

        response.json::<UserInfo>().await
    }
} 