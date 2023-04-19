import Config from "./Config";
import { tokenFetch, clearTokenFetch } from "../helpers/fetchers";

class Auth {
  token;
  setToken;

  constructor(argToken, argSetToken) {
    this.token = argToken;
    this.setToken = argSetToken;
    this.config = new Config();
  }

  async loginUser(credentials) {
    return tokenFetch(
            this.config.TOKEN_URL,
            {},
            new URLSearchParams(credentials),
            this.clearTokens.bind(this),
            this.storeTokens.bind(this));
  }

  async logoutUser() {
     return clearTokenFetch(
              this.config.TOKEN_URL,
              this.config.headersWithAuthorization(),
              null,
              this.clearTokens.bind(this));
   }

  storeTokens(json) {
    const userInfo = this.config.getPayloadFromJWT(json.access_token);
    this.setToken(userInfo);
    this.config.storeAccessToken(json.access_token);
  }

  clearTokens() {
    this.config.storeAccessToken("");
    this.setToken(null);
  }
}

export default Auth;
