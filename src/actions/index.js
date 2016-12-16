import fetch from 'isomorphic-fetch'
import cheerio from 'cheerio'
export const REQUEST_UPDATE = 'REQUEST_UPDATE';

export function requestUpdate() {
    return {
    	type: 'REQUEST_UPDATE',
    	payload: fetch('http://www.ncaa.com/scoreboard/football/fbs/2016/P')
      .then(response => response.text())
      .then(text => function(text)  {
      		var $ = cheerio.load(text);
					//parse into my format, stubbed for now
					var parsedScores = [];
					recieveScores(parsedScores);
      	}
      )
    }
}

function recieveScores(scores) {
	return {
		type: 'RECIEVE_SCORES',
		payload: {
			
		}
	}
}