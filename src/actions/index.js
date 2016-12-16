import fetch from 'fetch-jsonp'
export const INITIALIZE_GAMES = 'INITIALIZE_GAMES';
export const REQUEST_UPDATE = 'REQUEST_UPDATE';

const NCAAURL = 'http://data.ncaa.com/jsonp/scoreboard/football/fbs/2016/P/scoreboard.html'

export function initializeGames() {
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

export function requestUpdate() {
    return {
    	type: 'REQUEST_UPDATE',
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