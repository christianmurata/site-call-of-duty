class Dashboard {
  constructor() {
    this.login = new Login(false);
    this.header = new Header();
    this.postsList = document.getElementById('posts');
    this.inputSearch = document.getElementById('search');
    this.inputError = document.getElementById('search-error');
    this.submitSearch = document.getElementById('search-submit');

    this.postItemBase = request('views/post-item.html', false, false);

    this.init();
  }

  init() {
    if(!auth.isAuthenticated()) return window.location.hash = 'login';

    this.header.userHeader();
    this.posts();
    this.submitSearch.addEventListener('click', (e) => this.searchPosts(e, this));
  }

  validation() {
    const input = this.inputSearch.value.trim();
    const format = /^[^a-zA-Z0-9]+$/;

    if(!input)
      return false;

    if(format.test(input))
      return false;

    return true;
  }

  posts() {
    api.get('posts')
    
    .then(posts => {
      this.toHtml(posts)
      
      .then(htmlPosts => this.display(htmlPosts))
      
      .catch(err => console.error(err));
    })

    .catch(err => console.error(err));
  }

  async searchPosts (e, context) {
    e.preventDefault();

    if (!context.validation(context)){
      context.inputSearch.classList.add('error');
      context.inputError.innerText = 'Termo inválido. Digite novamente!'
      context.inputError.style.display = 'block';
      return;
    }

    context.inputSearch.classList.remove('error');
    context.inputError.style.display = 'none';

    const title = context.inputSearch.value.trim();
    const data = { title };

    api.get(`posts?${new URLSearchParams(data)}`).then(posts => {
      if(!posts.length)
        return context.display(['<p> Nenhum post encontrado. </p>']);

      this.toHtml(posts)
      
      .then(htmlPosts => this.display(htmlPosts))
      
      .catch(err => console.error(err));
    })

    .catch(err => console.error(err) || context.display(['<p> Nenhum post encontrado. </p>']));
  }

  async toHtml(posts) {
    let postsHtml = [];
    const baseHtml = await this.postItemBase;

    for(let post of posts) {
      let postHtml = baseHtml;

      postHtml = postHtml.replace('{attach}', `${api.url}${post.attach}`);
      postHtml = postHtml.replace('{title}', post.title);
      postHtml = postHtml.replace('{body}', post.body);

      postsHtml.push(postHtml);
    }

    return postsHtml;
  }

  async display(formattedPosts) {
    this.postsList.innerHTML = formattedPosts.join('\r\n');
  }
}