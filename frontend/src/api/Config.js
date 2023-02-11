class Config {
  SCHEME = process.env.SCHEME ? process.env.SCHEME : "http";
  HOST = process.env.HOST ? process.env.HOST : "10.248.131.31";
  LOCAL_HOST = "localhost";
  DEV_HOST = "10.248.131.31";
  DISCOR_DEV_HOST = "10.248.82.60";
  TEST_HOST = "10.248.71.210";
  DISCOR_TEST_HOST = "10.248.61.195";
  PROM_HOST = "10.248.130.162";
  DISCOR_PROM_HOST = "10.248.67.172";
  PORT = process.env.PORT ? process.env.PORT : "8000";
  LOCAL_PORT = "3000";
  DISCOR_PORT = "8920";
  API_VERS = "/api/v1/";
  //BASE_PATH = `${this.SCHEME}://${this.HOST}:${this.PORT}${this.API_VERS}`;
  BASE_PATH = `${this.API_VERS}`;
  //DISCOR_BASE_PATH = `${this.SCHEME}://${this.HOST}:${this.PORT}/effect${this.API_VERS}`;
  DISCOR_BASE_PATH = `/effect${this.API_VERS}`;
  LOCAL_ADDRESS = `${this.SCHEME}://${this.LOCAL_HOST}:${this.LOCAL_PORT}/`;
  DEV_ADDRESS = `${this.SCHEME}://${this.DEV_HOST}/`;
  TEST_ADDRESS = `${this.SCHEME}://${this.TEST_HOST}/`;
  PROM_ADDRESS = `${this.SCHEME}://${this.PROM_HOST}/`;
  WORK_GROUP_URL = `${this.BASE_PATH}workgroups`;
  MAILING_LIST_URL = `${this.BASE_PATH}emails`;
  TOKEN_URL = `${this.BASE_PATH}auth/token`;
  MENU_URL = `${this.BASE_PATH}menu`;
  FILE_URL = `${this.BASE_PATH}files`;
  DOC_URL = `${this.BASE_PATH}doc`;
  ADVERTS_URL = `${this.BASE_PATH}adverts`;
  ASOZ_URL = `${this.DISCOR_BASE_PATH}asoz`;
  RIGHTS_URL = `${this.DISCOR_BASE_PATH}rights`;
  USER_ASOZ_URL = `${this.DISCOR_BASE_PATH}user_asoz`;
  REPORTS_URL = `${this.BASE_PATH}reports`;
  INCOMES_URL = `${this.BASE_PATH}fact_incomes`;
  PERIODS_URL = `${this.BASE_PATH}periods`;
  TASKS_URL = `${this.BASE_PATH}tasks`;
  ACCESS_TOKEN = "access_token";
  EXPIRATION = "expiration";
  TNO_URL = `${this.BASE_PATH}tno`
  PROCESS_QUEUE =  `${this.TNO_URL}/process_queue`;
  GET_MENU_ITEMS = `${this.TNO_URL}/menu`;
  GET_DOC = `${this.TNO_URL}/get_doc`;

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
