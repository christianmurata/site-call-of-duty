class Router {
  constructor(routes) {
    this.routes = routes
    this.rootElement = document.getElementById('app');

    this.init();
  }

  init() {
    const self = this;

    window.addEventListener('hashchange', function(e) {
      self.change(self);
    });

    this.change();
  }

  change(self = false) {
    self = self || this;
    self.dispatch(self.routes, (!window.location.hash.length > 0))
  }

  dispatch(routes, defaultPath = false) {
    for (let route of routes) {
      if (defaultPath && route.defaultRoute){
        this.open(route.html, route);
        break;
      }

      if (route.isActive(window.location.hash)) {
        this.open(route.html, route);
        break;
      }
    }
  }

  open(uri, route) {
    const url = `views/${uri}`;
    const xhttp = new XMLHttpRequest();

    const self = this;

    xhttp.onreadystatechange = () => {
      if(xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
        self.rootElement.innerHTML = xhttp.responseText;
        
        try {
          route.init();
        } catch (error) {
          console.log(error);
          console.log(`File ${uri} has no initialization class`);
        }
      }
    }

    xhttp.open('GET', url, true);
    xhttp.send();
  }
}