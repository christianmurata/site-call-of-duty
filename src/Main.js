class Main {
  constructor () {
    this.login = new Login();
    this.init();
  }


  init () {
    if (this.login.getSessionToken())
      window.location.hash = 'dashboard';
  }
}