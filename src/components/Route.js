class Route {
  constructor (name, html, defaultRoute = false) {
    this.name = name;
    this.html = html;
    this.defaultRoute = defaultRoute;
  }

  capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

  isActive (pathHash) {
    return pathHash.replace('#', '') === this.name;
  }  

  init () {
    new (eval(this.capitalize(this.name)))()
  }
}