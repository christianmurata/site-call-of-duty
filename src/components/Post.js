class Post {
  constructor(init = true) {
    this.header = new Header();
    this.inputBody = document.getElementById('body');
    this.inputTitle = document.getElementById('title');
    this.inputAttach = document.getElementById('attach');
    this.inputBodyError = document.getElementById('body-error');
    this.inputTitleError = document.getElementById('title-error');
    this.inputAttachError = document.getElementById('attach-error');
    this.postSubmit = document.getElementById('post-submit');

    if(init) this.init();
  }

  init() {
    if(!auth.isAuthenticated()) return window.location.hash = 'login';
    
    this.header.userHeader();
    this.postSubmit.addEventListener('click', (e) => this.create(e, this));
  }

  clearError(context) {
    context.inputBody.classList.remove('error');
    context.inputTitle.classList.remove('error');
    context.inputAttach.classList.remove('error');
    context.inputBodyError.style.display = 'none';
    context.inputTitleError.style.display = 'none';
    context.inputAttachError.style.display = 'none';
  }

  displayError(context, input, msg = null) {
    if(input === 'title') {
      context.inputTitle.classList.add('error');
      context.inputTitleError.innerText = 'O titulo do post é obrigatório'
      context.inputTitleError.style.display = 'block';
    }

    if(input === 'body') {
      context.inputBody.classList.add('error');
      context.inputBodyError.innerText = 'O conteúdo do post é obrigatório'
      context.inputBodyError.style.display = 'block';
    }
  }

  validation() {
    const body = this.inputBody.value.trim();
    const title = this.inputTitle.value.trim();

    if(!title || title.length < 3)
      return [false, 'title'];

    if(!body || body.length < 3)
      return [false, 'body'];

    return [true, null];
  }

  create(e, context) {
    e.preventDefault();

    const [validation, input] = context.validation();

    if(!validation) {
      context.clearError(context);
      context.displayError(context, input);
      return;
    }
    
    context.clearError(context);

    const data = new FormData();
    data.append('body', this.inputBody.value.trim());
    data.append('title', this.inputTitle.value.trim());

    if(this.inputAttach.files[0])
      data.append('attach', this.inputAttach.files[0]);

    api.post('posts/create', data, true)

    .then(post => alert('post criado'))

    .catch(err => alert(err.message));
  }
}