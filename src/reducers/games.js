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
var nameToTeamId;

var TEAMS = {
	// FIXME: use prop name in logo path
	airforce: createTeam("Air Force", require('./logos/airforce.png')),
	alabama: createTeam("Alabama", require('./logos/alabama.png')),
	appstate: createTeam("Appalachian St.", require('./logos/appstate.png')),
	arkansas: createTeam("Arkansas", require('./logos/arkansas.png')),
	arkstate: createTeam("Arkansas State", require('./logos/arkstate.png')),
	army: createTeam("Army West Point", require('./logos/army.png')),
	auburn: createTeam("Auburn", require('./logos/auburn.png')),
	baylor: createTeam("Baylor", require('./logos/baylor.png')),
	boise: createTeam("Boise State", require('./logos/boise.png')),
	bostoncollege: createTeam("Boston College", require('./logos/bostoncollege.png')),
	byu: createTeam("BYU", require('./logos/byu.png')),
	cenmich: createTeam("Cent. Michigan", require('./logos/cenmich.png')),
	clemson: createTeam("Clemson", require('./logos/clemson.png')),
	colorado: createTeam("Colorado", require('./logos/colorado.png')),
	coloradostate: createTeam("Colorado State", require('./logos/coloradostate.png')),
	eastmich: createTeam("Eastern Mich.", require('./logos/eastmich.png')),
	florida: createTeam("Florida", require('./logos/florida.png')),
	flostate: createTeam("Florida State", require('./logos/flostate.png')),
	georgia: createTeam("Georgia", require('./logos/georgia.png')),
	geotech: createTeam("Georgia Tech", require('./logos/geotech.png')),
	hawaii: createTeam("Hawaii", require('./logos/hawaii.png')),
	houston: createTeam("Houston", require('./logos/houston.png')),
	idaho: createTeam("Idaho", require('./logos/idaho.png')),
	indiana: createTeam("Indiana", require('./logos/indiana.png')),
	iowa: createTeam("Iowa", require('./logos/iowa.png')),
	kentucky: createTeam("Kentucky", require('./logos/kentucky.png')),
	kanstate: createTeam("Kansas State", require('./logos/kanstate.png')),
	louisville: createTeam("Louisville", require('./logos/louisville.png')),
	loulaf: createTeam("La.-Lafayette", require('./logos/loulaf.png')),
	loutech: createTeam("Louisiana Tech", require('./logos/loutech.png')),
	lsu: createTeam("LSU", require('./logos/lsu.png')),
	maryland: createTeam("Maryland", require('./logos/maryland.png')),
	memphis: createTeam("Memphis", require('./logos/memphis.png')),
	miami: createTeam("Miami (Fla.)", require('./logos/miami.png')),
	miaoh: createTeam("Miami (Ohio)", require('./logos/miaoh.png')),
	michigan: createTeam("Michigan", require('./logos/michigan.png')),
	midtenn: createTeam("Middle Tenn.", require('./logos/midtenn.png')),
	minnesota: createTeam("Minnesota", require('./logos/minnesota.png')),
	misstate: createTeam("Mississippi St.", require('./logos/misstate.png')),
	navy: createTeam("Navy", require('./logos/navy.png')),
	ncstate: createTeam("NC State", require('./logos/ncstate.png')),
	nebraska: createTeam("Nebraska", require('./logos/nebraska.png')),
	newmexico: createTeam('New Mexico', require('./logos/newmexico.png')),
	northcarolina: createTeam("North Carolina", require('./logos/northcarolina.png')),
	northtexas: createTeam("North Texas", require('./logos/northtexas.png')),
	northwestern: createTeam("Northwestern", require('./logos/northwestern.png')),
	olddominion: createTeam("Old Dominion", require('./logos/olddominion.png')),
	ohio: createTeam("Ohio", require('./logos/ohio.png')),
	ohiostate: createTeam("Ohio State", require('./logos/ohiostate.png')),
	oklahoma: createTeam("Oklahoma", require('./logos/oklahoma.png')),
	okstate: createTeam("Oklahoma State", require('./logos/okstate.png')),
	pennstate: createTeam("Penn State", require('./logos/pennstate.png')),
	pitt: createTeam("Pittsburgh", require('./logos/pitt.png')),
	sdsu: createTeam("San Diego State", require('./logos/sdsu.png')),
	southalabama: createTeam("South Alabama", require('./logos/southalabama.png')),
	southcarolina: createTeam("South Carolina", require('./logos/southcarolina.png')),
	southmississippi: createTeam("Southern Miss", require('./logos/southmississippi.png')),
	southflorida: createTeam("South Florida", require('./logos/southflorida.png')),
	stanford: createTeam("Stanford", require('./logos/stanford.png')),
	tcu: createTeam("TCU", require('./logos/tcu.png')),
	temple: createTeam("Temple", require('./logos/temple.png')),
	tennessee: createTeam("Tennessee", require('./logos/tennessee.png')),
	texasam: createTeam("Texas A&M", require('./logos/texasam.png')),
	toledo: createTeam("Toledo", require('./logos/toledo.png')),
	tulsa: createTeam("Tulsa", require('./logos/tulsa.png')),
	troy: createTeam("Troy", require('./logos/troy.png')),
	ucf: createTeam("UCF", require('./logos/ucf.png')),
	usc: createTeam("USC", require('./logos/usc.png')),
	utah: createTeam("Utah", require('./logos/utah.png')),
	utsa: createTeam("UTSA", require('./logos/utsa.png')),
	vanderbilt: createTeam("Vanderbilt", require('./logos/vanderbilt.png')),
	vatech: createTeam("Virginia Tech", require('./logos/vatech.png')),
	wake: createTeam("Wake Forest", require('./logos/wake.png')),
	washington: createTeam("Washington", require('./logos/washington.png')),
	wastate: createTeam("Washington St.", require('./logos/wastate.png')),
	westkentucky: createTeam("Western Ky.", require('./logos/westkentucky.png')),
	westmichigan: createTeam("Western Mich.", require('./logos/westmichigan.png')),
	westvirginia: createTeam("West Virginia", require('./logos/westvirginia.png')),
	wisconsin: createTeam("Western Mich.", require('./logos/wisconsin.png')),
	wyoming: createTeam("Western Ky.", require('./logos/wyoming.png'))
}

export function nameToTeamId(name) {
	return nameToTeamId[name];
}

function createTeam(name, logo){
	teamId++;
	var newTeam = {
		name: name,
		logo: logo,
		id: teamId
	}
	nameToTeamId[name] = teamId;
	return(newTeam);
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
	return ({
		name: getNameFromLocation(game.location),
		location: game.location,
		date: game.startDateDisplay + ' ' + game.startTime,
		tv: getTVFromLocation(game.location),
		team1: createTeam(game.home["name-seo"]),
		team2: createTeam(game.away["name-seo"]),
		team1User: getUserForTeam(game.home["name-seo"]),
		team2User: getUserForTeam(game.away["name-seo"])
	});
}

function initializeGames(games) {
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
	default:
	}
	return state;
}