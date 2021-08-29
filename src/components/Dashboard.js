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
  }

  validation() {
    const input = this.inputSearch.value.trim();
    const number = /\d/g;
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!input)
      return false;

    if (number.test(input))
      return false;

    if (format.test(input))
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