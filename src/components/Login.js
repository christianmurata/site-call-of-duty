class Login {
  constructor(init = true) {
    this.inputEmail = document.getElementById('email');
    this.inputEmailError = document.getElementById('email-error');
    this.inputPassword = document.getElementById('password');
    this.inputPasswordError = document.getElementById('password-error');
    this.submitLogin = document.getElementById('login-submit');
    this.inputs = document.getElementsByTagName('input');
    this.spanErrors = document.getElementsByTagName('span');
    
    if(init) this.init();
  }

  init() {
    if(auth.isAuthenticated()) return window.location.hash = 'dashboard';

    this.header = new Header();
    this.submitLogin.addEventListener('click', (e) => this.login(e, this));
  }

  validation() {
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

  clearError(context) {
    context.inputEmail.classList.remove('error');
    context.inputPassword.classList.remove('error');
    context.inputEmailError.style.display = 'none';
    context.inputPasswordError.style.display = 'none';
  }

  displayError(context, input, msg = null) {
    if (input === 'email') {
      context.inputEmail.classList.add('error');
      context.inputEmailError.innerText = msg || 'Email inválido. Digite novamente!';
      context.inputEmailError.style.display = 'block';
    }

    if (input === 'password') {
      context.inputPassword.classList.add('error');
      context.inputPasswordError.innerText = msg || 'Senha inválida. Digite novamente!';
      context.inputPasswordError.style.display = 'block';
    }

    if(input === null) {
      context.inputEmail.classList.add('error');
      context.inputEmailError.innerText = 'Usuário não encontrado. Verifique o email digitado!';
      context.inputEmailError.style.display = 'block';
    } 
  }

  async login(e, context) {
    e.preventDefault();

    const [validation, input] = context.validation();

    if(!validation) {
      context.clearError(context);
      context.displayError(context, input);
      return;
    }
    
    context.clearError(context);

    const email = context.inputEmail.value; 
    const password = context.inputPassword.value;

    try {
      api.post('users/login', { email, password })
      
      .then(response => {
        auth.login(response.token, response.admin);

        window.location.hash = 'dashboard';
      })

      .catch(err => {
        console.log(err);

        if(err.message.match(/usuário/i))
          return context.displayError(context, 'email', err.message);

        if(err.message.match(/senha/i))
          return context.displayError(context, 'password', err.message);

        alert(err.message);
      });
    } catch (e) {
      context.displayError(context, null);
    }
  }
}