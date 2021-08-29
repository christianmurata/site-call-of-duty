const api = {
  url: 'https://call-of-duty-api-utf.herokuapp.com/',

  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  init() {
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if(auth.isAuthenticated()){
      const { token, admin } = auth.toJson();
  
      this.headers = {...this.headers, authorization: `Basic ${token}`};
    }
  },

  handleErrors(response) {
    if (!response.ok) {
      return response.json().then(err => { throw Error(err.message) });
    }

    return response.json();
  },

  get(uri, params = null) {
    this.init();

    return fetch(this.url + uri, {
      method: 'GET',
      headers: this.headers
    })

    .then(this.handleErrors);
  },

  post(uri, body, formData = false) {
    this.init();

    if(formData)
      delete this.headers['Content-Type'];

    return fetch(this.url + uri, {
      method: 'POST',
      body: (formData) ? body : JSON.stringify(body),
      headers: this.headers
    })
    
    .then(this.handleErrors);
  }
};