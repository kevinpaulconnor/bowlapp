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
      .then(data => parseScores(data))
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
		games: data,
		scores: {},
		gameState: [],
	};
	//var parsedGames = _prepareGames(data);
	data.forEach( function(game) {
		if (game.home.currentScore) {
			ret.scores[game.home.nameSeo] = game.home.currentScore;
			ret.scores[game.away.nameSeo] = game.away.currentScore;
			ret.gameState.push(game);
		}
	});
	
	return ret;
}