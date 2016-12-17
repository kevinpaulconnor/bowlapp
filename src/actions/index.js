import fetch from 'fetch-jsonp'
export const INITIALIZE_GAMES = 'INITIALIZE_GAMES';
export const REFRESH_SCORES = 'REFRESH_SCORES';

const NCAAURL = 'http://data.ncaa.com/jsonp/scoreboard/football/fbs/2016/P/scoreboard.html'

export function initializeGames(dispatch) {
		return {
    	type: 'INITIALIZE_GAMES',
    	payload: fetch(NCAAURL)
      .then(response => response.json())
      .then(data => _prepareGames(data))
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
      .then(data => parseScores(data))
    }
}

function parseScores(data) {
	console.log(data);
}

function recieveScores(scores) {
	return {
		type: 'RECIEVE_SCORES',
		payload: {
			
		}
	}
}