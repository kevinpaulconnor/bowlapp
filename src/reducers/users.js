export const USERS = {
	schex: {
		image: require('./users/schex.jpg'),
		pickOrder: [ 'stanford', 'michigan', 'boise-st', 'air-force', 'ohio', 'southern-california',
		'north-carolina-st', 'louisville', 'boston-college', 'toledo', 'utsa', 'colorado-st', 'southern-miss',
		'northwestern', 'army', 'arkansas-st', 'western-mich', 'miami-oh', 'old-dominion', 'louisiana-tech'
		]
	},
	dan: {
		image: require('./users/dan.jpg'),
		pickOrder: ['navy', 'pittsburgh', 'oklahoma', 'washington-st', 'georgia-tech', 'memphis',
		'hawaii', 'mississippi-st', 'ucf', 'south-fla', 'clemson', 'central-mich', 'san-diego-st',
		'baylor', 'troy','vanderbilt', 'arkansas', 'appalachian-st', 'miami-fl', 'indiana'
		]
	},
	pat: {
		image: require('./users/pat.jpg'),
		pickOrder: ['alabama', 'houston', 'oklahoma-st', 'wisconsin', 'lsu', 'virginia-tech', 'georgia', 'north-texas',
		'kansas-st', 'eastern-mich', 'la-lafayette', 'south-carolina', 'auburn', 'middle-tenn',
		'wake-forest', 'wyoming', 'nebraska', 'iowa', 'north-carolina', 'minnesota'
		]
	},
	kevin: {
		image: require('./users/kevin.jpg'),
		pickOrder: ['utah', 'new-mexico', 'tennessee', 'florida', 'temple', 'west-virginia', 'ohio-st',
		'byu','penn-st', 'idaho', 'texas-am', 'colorado', 'florida-st', 'tcu', 'tulsa',
		'western-ky', 'kentucky', 'south-ala', 'washington', 'maryland'
		]
	}
}

export const PICKTOUSER = (function() {
	var ret = {};
	Object.keys(USERS).forEach ( function(userKey) {
		var user = USERS[userKey];
		Object.keys(user.pickOrder).forEach( function (pickKey) {
			
			ret[user.pickOrder[pickKey]] = userKey;
		});
	});
	return ret;
})();

const initialState = {
	userPicks: initializePickState(),
	winTotal: {
		schex: 0,
		dan: 0,
		pat: 0,
		kevin: 0
	}
}

function initializePickState() {
	var ret = {};
	Object.keys(PICKTOUSER).forEach ( function(pick) {
		var pickKey = PICKTOUSER[pick];
		ret[pick] = createPick(undefined, pickKey)
	});
	console.log(ret);
	return ret;
}

function createPick(result, user) {
	return {
		result: result,
		user: user
	}
}

function createUserPicks(pickNames) {
	var ret = []
	pickNames.forEach( function(pick) {
		ret.push({
				selected: true,
				result: undefined,
				pick: pick
		});
	});
	return ret;
}



export default function(state = initialState, action) {
	switch (action.type) {
	case 'REFRESH_SCORES':
	case 'INITIALIZE_GAMES':
		console.log(action.payload);
		var newWinTotal = Object.assign({}, state.winTotal);
		var finalizedGames = {};
		action.payload.finalizedGames.forEach( function(game) {
			var homePicker = PICKTOUSER[game.home.nameSeo];
			var awayPicker = PICKTOUSER[game.away.nameSeo];
			if (game.home.winner === 'true') {
				newWinTotal[homePicker]++;
				finalizedGames[game.home.nameSeo] = createPick(true, homePicker);
				finalizedGames[game.away.nameSeo] = createPick(false, awayPicker);
			} else {
				newWinTotal[awayPicker]++;
				finalizedGames[game.home.nameSeo] = createPick(false, homePicker);
				finalizedGames[game.away.nameSeo] = createPick(true, awayPicker);
			}
		});

		// already created newWinTotal from current state win total
		state.winTotal = Object.assign({}, newWinTotal);
		state.userPicks = Object.assign({}, state.userPicks, finalizedGames);
		console.log(state);
		return state;
		break;
	default:
	}
	return state;
}