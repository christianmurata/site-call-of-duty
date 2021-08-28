class Dashboard {
  constructor() {
    this.login = new Login(false);
    this.header = new Header();
    this.gamesList = document.getElementById('games');
    this.inputSearch = document.getElementById('search');
    this.inputError = document.getElementById('search-error');
    this.submitSearch = document.getElementById('search-submit');

    this.init();
  }

  init() {
    if (!auth.isAuthenticated())
      return window.location.hash = 'login';
          
    // this.showGames();
    this.header.userHeader();
    // this.submitSearch.addEventListener('click', (e) => this.searchGame(e, this));
  }

  validation() {
    const input = this.inputSearch.value.trim();
    const number = /\d/g;
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!input)
      return false;

    if (number.test(input))
      return false;

    if (format.test(input))
      return false;

    return true;
  }
}