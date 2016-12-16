import fetch from 'fetch-jsonp'
import cheerio from 'cheerio'
export const REQUEST_UPDATE = 'REQUEST_UPDATE';

export function requestUpdate() {
    return {
    	type: 'REQUEST_UPDATE',
    	payload: fetch('http://data.ncaa.com/jsonp/scoreboard/football/fbs/2016/P/scoreboard.html')
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