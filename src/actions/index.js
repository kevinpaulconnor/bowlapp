import fetch from 'fetch-jsonp'
import {nameToTeamId} from '../reducers/games.js'
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

export function refreshScores() {
    return {
    	type: 'REFRESH_SCORES',
    	payload: fetch(NCAAURL)
      .then(response => response.json())
      .then(data => parseScores(data))
    }
}

function parseScores(data) {
	var ret = {
	};
	var parsedGames = _prepareGames(data);
	parsedGames.forEach( function(game) {
		if (game.home.currentScore) {
			var homeTeamId = nameToTeamId(game.home.nameSeo);
			var awayTeamId = nameToTeamId(game.away.nameSeo);
			ret[homeTeamId] = game.home.currentScore;
			ret[awayTeamId] = game.away.currentScore;
		}
	});
	
	return ret;
}