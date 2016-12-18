var USERS = {
	schex: createUser(require('./users/schex.jpg'), [
		'stanford', 'michigan', 'boise-st', 'air-force', 'ohio', 'southern-california', 'north-carolina-st',
		'louisville', 'boston-college', 'toledo', 'utsa', 'colorado-st', 'southern-miss',
		'northwestern', 'army', 'arkansas-st', 'western-mich', 'miami-oh', 'old-dominion', 'louisiana-tech'
	]),
	dan: createUser(require('./users/dan.jpg'), [
		'navy', 'pittsburgh', 'oklahoma', 'washington-st', 'georgia-tech', 'memphis', 'hawaii', 'mississippi-st',
		'ucf', 'south-fla', 'clemson', 'central-mich', 'san-diego-st', 'baylor', 'troy',
		'vanderbilt', 'arkansas', 'appalachian-st', 'miami-fl', 'indiana'
	]),
	pat: createUser(require('./users/pat.jpg'), [
		'alabama', 'houston', 'oklahoma-st', 'wisconsin', 'lsu', 'virginia-tech', 'georgia', 'north-texas',
		'kansas-st', 'eastern-mich', 'la-lafayette', 'south-carolina', 'auburn', 'middle-tenn',
		 'wake-forest', 'wyoming', 'nebraska', 'iowa', 'north-carolina', 'minnesota'
	]),
	kevin: createUser(require('./users/kevin.jpg'), [
		'utah', 'new-mexico', 'tennessee', 'florida', 'temple', 'west-virginia', 'ohio-st', 'byu',
		'penn-st', 'idaho', 'texas-am', 'colorado', 'florida-st', 'tcu', 'tulsa',
		'western-ky', 'kentucky', 'south-ala', 'washington', 'maryland'
	]),
	// error defaults :)
	michigan: createUser(require('./users/michigan.png'), [])
}

function createUser(image, picksArray) {

	function assignPicks (picksArray) {
		var ret = {};
		picksArray.forEach( function(pick) {
			ret[pick] =  true;
		});
		return ret;
	}

	return ({
		image: image,
		picks: assignPicks(picksArray)
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
	var ret = USERS.michigan;
	
	for (var user in USERS) {
		if (USERS[user].picks && USERS[user].picks[team]) {
			ret = USERS[user];
		}
	};
	
	return ret;
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
		return [ ...state = initializeGames(action.payload.games) ]
		break;
	case 'REFRESH_SCORES':
		for (var game in action.payload.updatedGames) {
			var gameToUpdate = state.indexOf(game);
			Object.assign({}, gameToUpdate, game);
		}
		return state
	default:
	}
	return state;
}