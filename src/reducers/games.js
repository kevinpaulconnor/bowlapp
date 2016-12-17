var USERS = {
	schex: createUser(require('./users/schex.jpg')),
	dan: createUser(require('./users/dan.jpg')),
	pat: createUser(require('./users/pat.jpg')),
	kevin: createUser(require('./users/kevin.jpg')),
}

function createUser(image) {
	return ({
		image: image
	});
}
var teamId = 0;
var TEAMS = { };

// might no longer need teamId concept
export function nameToTeamId(name) {
	return nameToTeamId[name];
}

function createTeam(name){
	teamId++;
	var newTeam = {
		name: name,
		logo: getLogoForName(name),
		id: teamId
	}
	nameToTeamId[name] = teamId;
	TEAMS[name] = newTeam;
	return(newTeam);
}

function getLogoForName(name) {
	return require('./logos/'+ name +'.png');
}

function getTVFromHomeTeam(teamName) {
	if (teamName === 'houston' || teamName === 'louisville' || teamName === 'iowa') {
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

function getBowlNameFromOrder(id) {
	// fragile and hate this, but NCAA Api isn't including names
	var orderedNames = [
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
		'Fiesta Bowl',
		'Citrus Bowl',
		'Taxslayer Bowl',
		'Peach Bowl',
		'Outback Bowl',
		'Cotton Bowl',
		'Rose Bowl',
		'Sugar Bowl'
	];
	return orderedNames[id] ? orderedNames[id] : 'Undefined Name';
}

function getUserForTeam(team) {
	return USERS.schex;
}

function createBowlGame(game, counter) {
	var stadiumName = game.location.split(',',1);
	var gameLocation = game.location.slice(stadiumName[0].length+2, game.location.length);
	return ({
		name: getBowlNameFromOrder(counter),
		location: gameLocation,
		stadium: stadiumName,
		gameState: game.gameState,
		date: game.startDateDisplay + ' ' + game.startTime,
		tv: getTVFromHomeTeam(game.home["nameSeo"]),
		team1: createTeam(game.home["nameSeo"]),
		team2: createTeam(game.away["nameSeo"]),
		team1User: getUserForTeam(game.home["nameSeo"]),
		team2User: getUserForTeam(game.away["nameSeo"])
	});
}

function initializeGames(games) {
	teamId = 0;
	var state = [];
	var counter = 0;
	games.forEach( function(game) {
		state.push(createBowlGame(game, counter));
		counter++;
	});
	return state;
}

const initialState = [];

export default function(state = initialState, action) {
	switch (action.type) {
	case 'INITIALIZE_GAMES':
		return [ ...state = initializeGames(action.payload) ]
		break;
	case 'REFRESH_SCORES':
		return state;
	default:
	}
	return state;
}