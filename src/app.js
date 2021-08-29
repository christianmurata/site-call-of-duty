(function(){
  new Router ([
    new Route('main', 'main.html', true),
    new Route('login', 'login.html'),
    new Route('cadastro', 'cadastro.html'),
    new Route('dashboard', 'dashboard.html'),
    new Route('post', 'post.html'),
  ]);
}());