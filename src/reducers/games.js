export var TEAMS = {};

function createTeam(name, displayName){
	var ret = {
		name: name,
		displayName: displayName,
		logo: getLogoForName(name),
	}
	TEAMS[name] = ret;
	return ret;
}

function getLogoForName(name) {
	if (name === 'team') {
		return undefined;
	} else {
		return require('./logos/'+ name +'.png');
	}
}

function getTVFromHomeTeam(teamName) {
	if (teamName === 'san-diego-st' || teamName === 'louisville' || teamName === 'iowa') {
		return 'ABC';
	} else if (teamName === 'arkansas-st'){
		return 'CBSSN';
	} else if (teamName === 'vanderbilt') {
		return 'ESPN2';
	} else if (teamName === 'utah') {
		return 'FOX';
	} else if (teamName === 'north-carolina') {
		return 'CBS';
	} else if (teamName === 'air-force') {
		return 'ASN';
	} 
	else {
		return 'ESPN';
	}
}

// fragile and hate this, but NCAA Api isn't including names
const orderedNames = [
		'New Mexico Bowl',
		'Las Vegas Bowl',
		'Camellia Bowl',
		'Cure Bowl',
		'New Orleans Bowl',
		'Miami Beach Bowl',
		'Boca Raton Bowl',
		'Poinsettia Bowl',
		'Idaho Potato Bowl',
		'Bahamas Bowl',
		'Armed Forces Bowl',
		'Dollar General Bowl',
		'Hawaii Bowl',
		'St. Petersburg Bowl',
		'Quick Lane Bowl',
		'Independence Bowl',
		'Heart of Dallas Bowl',
		'Military Bowl',
		'Holiday Bowl',
		'Cactus Bowl',
		'Pinstripe Bowl',
		'Russel Athletic Bowl',
		'Foster Farms Bowl',
		'Texas Bowl',
		'Birmingham Bowl',
		'Belk Bowl',
		'Alamo Bowl',
		'Liberty Bowl',
		'Sun Bowl',
		'Music City Bowl',
		'Arizona Bowl',
		'Orange Bowl',
		'Taxslayer Bowl',
		'Citrus Bowl',
		'Peach Bowl',
		'Fiesta Bowl',
		'Outback Bowl',
		'Cotton Bowl',
		'Rose Bowl',
		'Sugar Bowl'
];

function getBowlNameFromOrder(id) {
	return orderedNames[id] ? orderedNames[id] : 'Undefined Name';
}

function createBowlGame(game, counter) {
	if (game === null) {
		game = {
			location: "-,-",
			name: '-',
			stadium: '-',
			date: '-',
			tv: '-',
			home: {nameSeo: "team", nameRaw: "Team"},
			away: {nameSeo: "team", nameRaw: "Team"}
		}
	}
	var stadiumName = game.location.split(',',1);
	var gameLocation = game.location.slice(stadiumName[0].length+2, game.location.length);
	return ({
		name: getBowlNameFromOrder(counter),
		location: gameLocation,
		stadium: stadiumName[0],
		date: game.startDateDisplay + ' ' + game.startTime,
		tv: getTVFromHomeTeam(game.home["nameSeo"]),
		team1: createTeam(game.home["nameSeo"], game.home["nameRaw"]),
		team2: createTeam(game.away["nameSeo"], game.away["nameRaw"])
	});
}

function initializeGames(games) {
	var state = [];
	var counter = 0;
	games.forEach( function(game) {
		//FRAGILE. Hopefully next year's api has a better way to filter out championship
		if (game.startDateDisplay === "Jan. 9") {
		} else {
			state.push(createBowlGame(game, counter));
			counter++;
		}
	});
	return state;
}

const initialState = {
	games: [ createBowlGame(null) ],
	gameState: orderedNames.map(function() { return 'pre'})
};

export default function(state = initialState, action) {
	switch (action.type) {
	case 'INITIALIZE_GAMES':
		// _ is a Swift-ism...not sure convention for supressed return in javascript
		var _ = [ ...state.games = initializeGames(action.payload.games) ];
		_ = [ ...state.gameState = action.payload.gameState ];
		return state;
	case 'REFRESH_SCORES':
		_ = [ ...state.gameState = action.payload.gameState ];
		return state
	default:
	}
	return state;
}