class Header {
  constructor() {
    this.play = document.getElementById('play');
    this.header = document.getElementById('header');
    this.postButton = document.getElementById('post');
    this.logoutButton = document.getElementById('logout');

    this.init();
  }

  init() {
    if(this.postButton.onclick) return false;

    this.postButton.addEventListener('click', (e) => this.newPost(e));
    this.logoutButton.addEventListener('click', (e) => this.sessionLogout(this));

    this.postButton.onclick = () => true;
  }

  userHeader() {
    this.play.style.display = 'none';
    this.visibility(this.header.getElementsByClassName('item'), 'none');
    this.visibility(this.header.getElementsByClassName('logged-in'), 'block');
  }

  visitorHeader() {
    this.play.style.display = 'block';
    this.visibility(this.header.getElementsByClassName('item'), 'block');
    this.visibility(this.header.getElementsByClassName('logged-in'), 'none');
  }

  visibility(itens, display) {
    for (let item of itens) {
      item.style.display = display;
    }
  }

  newPost(e) {
    e.preventDefault();

    if(!auth.isAdmin()) {
      return alert('Este usuário não possui permissão para postar.');
    }

    window.location.hash = 'post';
  }

  sessionLogout(context) {
    auth.logout();
    context.visitorHeader();
  }
}