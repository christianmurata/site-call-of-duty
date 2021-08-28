const api = {
  url: 'http://localhost:3000/',

  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  init() {
    if(!auth.isAuthenticated())
      return;

    const { token, admin } = auth.toJson();

    this.headers = {...this.headers, authorization: `Basic ${token}`};
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

  post(uri, body) {
    this.init();

    return fetch(this.url + uri, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.headers
    })
    
    .then(this.handleErrors);
  }
};