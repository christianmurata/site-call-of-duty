class Cadastro {
  constructor(init = true) {
    this.inputEmail = document.getElementById('email');
    this.inputLogin = document.getElementById('login');
    this.inputPassword = document.getElementById('password');
    this.inputConfirmPassword = document.getElementById('confirmPassword');
    this.inputEmailError = document.getElementById('email-error');
    this.inputLoginError = document.getElementById('login-error');
    this.inputPasswordError = document.getElementById('password-error');
    this.inputConfimPasswordError = document.getElementById('confirmPassword-error');
    this.submitCadastro = document.getElementById('cadastro-submit');
    this.inputs = document.getElementsByTagName('input');
    this.spanErrors = document.getElementsByTagName('span');
    
    if(init) this.init();
  }

  init() {
    if(auth.isAuthenticated()) return window.location.hash = 'dashboard';

    this.header = new Header();
    this.submitCadastro.addEventListener('click', (e) => this.create(e, this));
  }

  validation() {
    const email = this.inputEmail.value.trim();
    const login = this.inputLogin.value.trim();
    const password = this.inputPassword.value.trim();
    const confirmPassword = this.inputConfirmPassword.value.trim();

    const format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!login || login.length < 3)
      return [false, 'login'];

    if(!email || email.length < 3)
      return [false, 'email'];

    if(!format.test(email))
      return [false, 'email'];

    if(!password || password.length < 3)
      return [false, 'password'];

    if(!confirmPassword || confirmPassword.length < 3)
      return [false, 'confirmPassword'];

    if(confirmPassword !== password)
      return [false, 'confirmPasswordMissmatch'];

    return [true, null];
  }

  clearError(context) {
    context.inputEmail.classList.remove('error');
    context.inputLogin.classList.remove('error');
    context.inputPassword.classList.remove('error');
    context.inputConfirmPassword.classList.remove('error');
    context.inputEmailError.style.display = 'none';
    context.inputLoginError.style.display = 'none';
    context.inputPasswordError.style.display = 'none';
    context.inputConfimPasswordError.style.display = 'none';
  }

  displayError(context, input, msg = null) {
    if(input === 'email') {
      context.inputEmail.classList.add('error');
      context.inputEmailError.innerText = msg || 'Email inválido. Digite um email válido';
      context.inputEmailError.style.display = 'block';
    }

    if(input === 'login') {
      context.inputLogin.classList.add('error');
      context.inputLoginError.innerText = msg || 'Login inválido. Digite um login válido';
      context.inputLoginError.style.display = 'block';
    }

    if(input === 'password') {
      context.inputPassword.classList.add('error');
      context.inputPasswordError.innerText = msg || 'Senha inválida. Digite uma senha válida';
      context.inputPasswordError.style.display = 'block';
    }

    if(input === 'confirmPassword') {
      context.inputConfirmPassword.classList.add('error');
      context.inputConfimPasswordError.innerText = msg || 'Senha inválida. Digite uma senha válida';
      context.inputConfimPasswordError.style.display = 'block';
    }

    if(input === 'confirmPasswordMissmatch') {
      context.inputConfirmPassword.classList.add('error');
      context.inputConfimPasswordError.innerText = msg || 'As senhas não conferem';
      context.inputConfimPasswordError.style.display = 'block';
    }

    if(input === null) {
      context.inputEmail.classList.add('error');
      context.inputEmailError.innerText = msg || 'Usuário não encontrado. Verifique o email digitado!';
      context.inputEmailError.style.display = 'block';
    }
  }

  async create(e, context) {
    e.preventDefault();

    const [validation, input] = context.validation();

    if(!validation) {
      context.clearError(context);
      context.displayError(context, input);
      return;
    }
    
    context.clearError(context);

    const email = context.inputEmail.value; 
    const login = context.inputLogin.value;
    const password = context.inputPassword.value;
    const confirmPassword = context.inputPassword.value;

    try {
      api.post('users/create', { email, login, password, confirmPassword })
      
      .then(response => {
        // alert('Sucesso! Usuário criado');

        window.location.hash = 'login';
      })

      .catch(err => {
        if(err.message.match(/email/i))
          return context.displayError(context, 'email', err.message);

        if(err.message.match(/login/i))
          return context.displayError(context, 'login', err.message);

        if(err.message.match(/senha/i))
          return context.displayError(context, 'senha', err.message);

        alert(err.message);
      });
    } catch (e) {
      context.displayError(context, null);
    }
  }
}