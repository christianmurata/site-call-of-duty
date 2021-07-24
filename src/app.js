(function(){
  document.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log(e.target);

    alert('dadsa');
  });

  new Router ([
    new Route('main', 'main.html', true),
    new Route('login', 'login.html'),
    new Route('dashboard', 'dashboard.html'),
  ]);
}());