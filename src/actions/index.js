import fetch from 'fetch-jsonp'
export const INITIALIZE_GAMES = 'INITIALIZE_GAMES';
export const REFRESH_SCORES = 'REFRESH_SCORES';
export const CHANGE_VIEW = 'CHANGE_VIEW';

const NCAAURL = 'http://data.ncaa.com/jsonp/scoreboard/football/fbs/2016/P/scoreboard.html'

export function changeView() {
	return {
		type: "CHANGE_VIEW",
		payload: {}
	}
}
// FIXME: consolidate initialize game action with refresh scores action.
// (they are different at the reducer level, but the same at action level)
// (is that a code smell ?)
export function initializeGames() {
		return {
    	type: 'INITIALIZE_GAMES',
    	payload: fetch(NCAAURL)
      .then(response => response.json())
      .then(data => _prepareGames(data))
      .then(data => _mergeGamesWithScores(data))
    }
}

function _prepareGames(data) {
	var games = [];
	data.scoreboard.forEach( function(item) {
		games = games.concat(item.games);
	});
	
	return games;
}

/*-------------------*/

export function refreshScores() {
    return {
    	type: 'REFRESH_SCORES',
    	payload: fetch(NCAAURL)
      .then(response => response.json())
      .then(data => _prepareGames(data))
      .then(data => _mergeGamesWithScores(data))
    }
}

function _prepareScores(games) {
	var ret = {
		scores: {},
		gameState: [],
		finalizedGames: []
	};
	
	games.forEach( function(game, index) {
		if (game.gameStatus === undefined) {	
			ret.gameState[index] = 'pre';
		} else {
			ret.gameState[index] = game.gameStatus;
		}
		if (game.home.currentScore) {
			ret.scores[game.home.nameSeo] = game.home.currentScore;
			ret.scores[game.away.nameSeo] = game.away.currentScore;
		}
		if (game.gameStatus === 'Final') {
			ret.finalizedGames.push(game);
		}
	});
	return ret;	
}

function _mergeGamesWithScores(games) {
	var ret = _prepareScores(games)
	ret.games = games;
	return ret;
}