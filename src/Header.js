class Header {
  constructor () {
    this.play = document.getElementById('play');
    this.header = document.getElementById('header');
    this.logout = document.getElementById('logout');
    this.logoutButton = document.getElementById('logout');

    this.init();
  }

  init () {
    this.logoutButton.addEventListener('click', (e) => this.sessionLogout(this))
  }

  userHeader () {
    this.play.style.display = 'none';
    this.logout.style.display = 'block';
    this.visibility(this.header.getElementsByClassName('item'), 'none');
  }

  visitorHeader () {
    this.play.style.display = 'block';
    this.logout.style.display = 'none';
    this.visibility(this.header.getElementsByClassName('item'), 'block');
  }

  visibility (itens, display) {
    for (let item of itens) {
      item.style.display = display;
    }
  }

  sessionLogout (context) {
    localStorage.removeItem('token');
    context.visitorHeader();
  }
}