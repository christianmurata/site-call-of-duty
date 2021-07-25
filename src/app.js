const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

(function(){
  new Router ([
    new Route('main', 'main.html', true),
    new Route('login', 'login.html'),
    new Route('dashboard', 'dashboard.html'),
  ]);
}());