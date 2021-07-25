class Login {
  constructor (init = true) {
    this.inputEmail = document.getElementById('email');
    this.inputEmailError = document.getElementById('email-error');
    this.inputPassword = document.getElementById('password');
    this.inputPasswordError = document.getElementById('password-error');
    this.submitLogin = document.getElementById('login-submit');
    this.inputs = document.getElementsByTagName('input');
    this.spanErrors = document.getElementsByTagName('span');
    
    if (init)
      this.init();
  }

  init () {
    if (this.getSessionToken())
      window.location.hash = 'dashboard';

    this.header = new Header();

    this.submitLogin.addEventListener('click', (e) => this.login(e, this));
  }

  validation () {
    const email = this.inputEmail.value.trim();
    const password = this.inputPassword.value.trim();

    const format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || email.length < 3)
      return [false, 'email'];

    if(!format.test(email))
      return [false, 'email'];

    if (!password || password.length < 3)
      return [false, 'password']

    return [true, null];
  }

  getSessionToken () {
    return localStorage.getItem('token');
  }

  setSessionToken (token) {
    localStorage.setItem('token', token)
  }

  clearError (context) {
    context.inputEmail.classList.remove('error');
    context.inputPassword.classList.remove('error');
    context.inputEmailError.style.display = 'none';
    context.inputPasswordError.style.display = 'none';
  }

  displayError (context, input) {
    if (input === 'email') {
      context.inputEmail.classList.add('error');
      context.inputEmailError.innerText = 'Email inválido. Digite novamente!';
      context.inputEmailError.style.display = 'block';
    }

    if (input === 'password') {
      context.inputPassword.classList.add('error');
      context.inputPasswordError.innerText = 'Senha inválida. Digite novamente!';
      context.inputPasswordError.style.display = 'block';
    }

    if(input === null) {
      context.inputEmail.classList.add('error');
      context.inputEmailError.innerText = 'Usuário não encontrado. Verifique o email digitado!';
      context.inputEmailError.style.display = 'block';
    } 
  }

  async login (e, context) {
    e.preventDefault();

    const [validation, input] = context.validation();

    if(!validation) {
      context.clearError(context);
      context.displayError(context, input);
      return;
    }
    
    context.clearError(context);

    const reqres = new Reqres();

    const email = context.inputEmail.value; 
    const password = context.inputPassword.value;

    try {
      const response = JSON.parse(await reqres.login(email, password));

      context.setSessionToken(response.token);
      context.header.userHeader();

      window.location.hash = 'dashboard';

    } catch (e) {
      context.displayError(context, null);
    }
  }
}