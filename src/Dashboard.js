class Dashboard {
  constructor () {
    this.login = new Login(false);
    this.gamesList = document.getElementById('games');
    this.inputSearch = document.getElementById('search');
    this.inputError = document.getElementById('search-error');
    this.submitSearch = document.getElementById('search-submit');

    this.init();
  }

  init () {
    if (!this.login.getSessionToken())
      return window.location.hash = 'login';

    this.showGames();
    this.submitSearch.addEventListener('click', (e) => this.searchGame(e, this));
  }

  validation () {
    const input = this.inputSearch.value.trim();
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!input)
      return false;

    if (format.test(input))
      return false;

    return true;
  }

  async showGames () {
    const freeToGame = new FreeToGame(this.gamesList, this.inputSearch);
    const games = JSON.parse(await freeToGame.getAll());
    const formattedGames = await freeToGame.toHtml(games);

    freeToGame.display(formattedGames);
  }

  async searchGame (e, context) {
    e.preventDefault();

    if (!context.validation(context)){
      context.inputSearch.classList.add('error');
      context.inputError.innerText = 'Termo inválido. Digite novamente!'
      context.inputError.style.display = 'block';

      return;
    }

    context.inputSearch.classList.remove('error');
    context.inputError.style.display = 'none';

    const category = context.inputSearch.value;
    const freeToGame = new FreeToGame(context.gamesList, context.inputSearch);
    const games = JSON.parse(await freeToGame.getByCategory(category));
    const formattedGames = await freeToGame.toHtml(games);

    freeToGame.display(formattedGames);
  }
}