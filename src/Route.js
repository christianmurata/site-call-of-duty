class Route {
  constructor (name, html, defaultRoute = false) {
    this.name = name;
    this.html = html;
    this.defaultRoute = defaultRoute;
  }

  isActive (pathHash) {
    return pathHash.replace('#', '') === this.name;
  }

  init () {
    new (eval(capitalize(this.name)))()
  }
}