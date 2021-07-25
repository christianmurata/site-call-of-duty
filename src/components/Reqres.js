/**
 * 
 * @see
 * @author Christian Murata
 */

class Reqres {
  constructor () {
    this.baseUrl = 'https://reqres.in/api';
  }

  async login (email, password) {
    const url = this.baseUrl + '/login';

    return request(url, {email: email, password: password}, false, 'post');
  }
}