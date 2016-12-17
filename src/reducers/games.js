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

function getTVFromLocation() {
	return 'ESPN';
}

function getNameFromLocation(location) {
	return 'New Mexico Bowl';
}

function getUserForTeam(team) {
	return USERS.schex;
}

function createBowlGame(game) {
	var stadiumName = game.location.split(',',1);
	var gameLocation = game.location.slice(stadiumName[0].length+2, game.location.length);
	return ({
		name: getNameFromLocation(game.location),
		location: gameLocation,
		stadium: stadiumName,
		gameState: game.gameState,
		date: game.startDateDisplay + ' ' + game.startTime,
		tv: getTVFromLocation(game.location),
		team1: createTeam(game.home["nameSeo"]),
		team2: createTeam(game.away["nameSeo"]),
		team1User: getUserForTeam(game.home["nameSeo"]),
		team2User: getUserForTeam(game.away["nameSeo"])
	});
}

function initializeGames(games) {
	teamId = 0;
	var state = [];
	games.forEach( function(game) {
		state.push(createBowlGame(game));
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