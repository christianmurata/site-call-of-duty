/**
 * Free-To-Play Games Database- Find & track the best free-to-play games!
 * 
 * @see https://www.freetogame.com/api-doc
 * @author Christian Murata
 */

class FreeToGame {
  constructor(gamesList, inputSearch) {
    this.games = []
    this.gamesList = gamesList;
    this.inputSearch = inputSearch;

    this.baseUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    this.gameItemBase = request('views/game.html', false, false);
  }

  getAll() {
    return request(
      this.baseUrl, 
      false, 
      {
        'x-rapidapi-key': '394ff7856dmshdfc464d0c1444e7p1df822jsn06f8be07529d',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    );
  }

  getByCategory(category) {
    return request(
      this.baseUrl, 
      {'category': category}, 
      {
        'x-rapidapi-key': '394ff7856dmshdfc464d0c1444e7p1df822jsn06f8be07529d',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    );
  }

  async toHtml(games) {
    let gamesHtml = [];
    const baseHtml = await this.gameItemBase;

    for(let game of games) {
      let gameHtml = baseHtml;

      gameHtml = gameHtml.replace('{thumbnail}', game.thumbnail);
      gameHtml = gameHtml.replace('{title}', game.title);
      gameHtml = gameHtml.replace('{genre}', game.genre);
      gameHtml = gameHtml.replace('{short_description}', game.short_description);
      gameHtml = gameHtml.replace('{freetogame_profile_url}', game.freetogame_profile_url);
      gameHtml = gameHtml.replace('{game_url}', game.game_url);

      gamesHtml.push(gameHtml);
    }

    return gamesHtml;
  }

  async display(formattedGames) {
    this.gamesList.innerHTML = formattedGames.join('\r\n');
  }
}