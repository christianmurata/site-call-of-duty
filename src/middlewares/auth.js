const auth = {
  login(token, admin) {
    localStorage.setItem('token', token);
    localStorage.setItem('admin', admin);
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  },

  toJson() {
    return {
      'token': localStorage.getItem('token'),
      'admin': localStorage.getItem('admin'),
    };
  },

  isAdmin() {
    return localStorage.getItem('admin') === "true";
  },

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }
}