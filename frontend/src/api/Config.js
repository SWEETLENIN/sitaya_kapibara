class Config {
  SCHEME = process.env.SCHEME ? process.env.SCHEME : "http";
  LOCAL_HOST = "localhost";
  PORT = process.env.PORT ? process.env.PORT : "8000";
  LOCAL_PORT = "3000";
  API_VERS = "/api/v1/";
  BASE_PATH = `${this.SCHEME}://${this.LOCAL_HOST}:${this.PORT}${this.API_VERS}`;
  //DISCOR_BASE_PATH = `${this.SCHEME}://${this.HOST}:${this.PORT}/effect${this.API_VERS}`;
  DISCOR_BASE_PATH = `/effect${this.API_VERS}`;
  TEST_ADDRESS = `${this.SCHEME}://${this.TEST_HOST}/`;
  PROM_ADDRESS = `${this.SCHEME}://${this.PROM_HOST}/`;
  TOKEN_URL = `${this.BASE_PATH}auth/token`;
  ADVERTS_URL = `${this.BASE_PATH}adverts`;
  ACCESS_TOKEN = "access_token";
  EXPIRATION = "expiration";

  defaultHeaders() {
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
  }

  headersWithAuthorization() {
    return {
      ...this.defaultHeaders(),
      "Authorization": localStorage.getItem(this.ACCESS_TOKEN),
    };
  }

  headersOnlyAuthorization() {
    return {
        "Authorization": localStorage.getItem(this.ACCESS_TOKEN),
    }
  }

  tokenExpired() {
    const expDate = Number(localStorage.getItem(this.EXPIRATION));
    if (expDate > Date.now()) {
      return false;
    }
    return true;
  }

  storeAccessToken(token) {
    localStorage.setItem(this.ACCESS_TOKEN, `Bearer ${token}`);
    localStorage.setItem(this.EXPIRATION, this.getExpiration(token));
  }

  getPayloadFromJWT(token) {
    let encodedPayload = token ? token.split(".")[1] : null;
    if (encodedPayload) {
      encodedPayload = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(encodedPayload));
      return payload;
    }
    return {};
  }

  getExpiration(token) {
    const payload = this.getPayloadFromJWT(token)
    if (payload) return payload?.exp ? payload?.exp * 1000 : 0;
    return 0;
  }

  getRestorePasswordUrlForDiscor(url){
    let restorePasswordUrl = "";
    let discorHost = "";
    let effectHost = "";
    switch (window.location.href) {
      // на тестовом полигоне?
      case this.TEST_ADDRESS:
        discorHost=this.DISCOR_TEST_HOST;
        effectHost=this.TEST_HOST;
        break;
      // на проме?
      case this.PROM_ADDRESS:
        discorHost=this.DISCOR_PROM_HOST;
        effectHost=this.PROM_HOST;
      //если не удается определить, то на полигон разработки
      default:
        discorHost=this.DISCOR_DEV_HOST;
        effectHost=this.DEV_HOST;
    }
    restorePasswordUrl = `${this.SCHEME}://${discorHost}:${this.DISCOR_PORT}/restorePassword?urlLoginPage=${this.SCHEME}://${effectHost}`;
    return restorePasswordUrl;
  }

}

export default Config;
