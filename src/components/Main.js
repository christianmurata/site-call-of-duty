class Main {
  constructor () {
    this.login = new Login();
    this.init();
  }

  init () {
    if (auth.isAuthenticated())
      window.location.hash = 'dashboard';
  }
}