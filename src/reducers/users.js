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

function initializePickState() {
	var ret = {};
	Object.keys(PICKTOUSER).forEach ( function(pick) {
		var pickKey = PICKTOUSER[pick];
		ret[pick] = createPick(undefined, pickKey)
	});
	return ret;
}

function createPick(result, user) {
	return {
		result: result,
		user: user
	}
}

const initialState = {
	userPicks: initializePickState(),
	winTotal: {
		schex: 0,
		dan: 0,
		pat: 0,
		kevin: 0
	},
	gamesRemaining: {
		schex: 20,
		dan: 20,
		pat: 20,
		kevin: 20	
	},
	tiebreaker: {
		schex: createTiebreaker(1,Number.MAX_SAFE_INTEGER),
		dan: createTiebreaker(1,Number.MAX_SAFE_INTEGER),
		pat: createTiebreaker(1,Number.MAX_SAFE_INTEGER),
		kevin: createTiebreaker(1,Number.MAX_SAFE_INTEGER)		
	}
}

function createTiebreaker(order, indexOfLosingTeam) {
	return {
		order: order,
		indexOfLosingTeam: indexOfLosingTeam
	}
}

export default function(state = initialState, action) {
	switch (action.type) {
	case 'REFRESH_SCORES':
	case 'INITIALIZE_GAMES':
		// not crazy about this situation
		// FIXME: find a way to increment rather than re-init
		// need to handle at action level perhaps?
		// or at least, only have this initialization in one place
		var newWinTotal = {
			schex: 0,
			dan: 0,
			pat: 0,
			kevin: 0
		}
		var newGamesRemaining = {
			schex: 20,
			dan: 20,
			pat: 20,
			kevin: 20
		}
		var newTiebreaker = {
		schex: createTiebreaker(1,Number.MAX_SAFE_INTEGER),
		dan: createTiebreaker(1,Number.MAX_SAFE_INTEGER),
		pat: createTiebreaker(1,Number.MAX_SAFE_INTEGER),
		kevin: createTiebreaker(1,Number.MAX_SAFE_INTEGER)	
		}		
		var newFinalizedGames = {};
		action.payload.finalizedGames.forEach( function(game) {
			var homePicker = PICKTOUSER[game.home.nameSeo];
			var awayPicker = PICKTOUSER[game.away.nameSeo];
			if (game.home.winner === 'true') {
				newWinTotal[homePicker]++;
				newFinalizedGames[game.home.nameSeo] = createPick(true, homePicker);
				newFinalizedGames[game.away.nameSeo] = createPick(false, awayPicker);
				if (USERS[awayPicker].pickOrder.indexOf(game.away.nameSeo) < newTiebreaker[awayPicker].indexOfLosingTeam) {
					newTiebreaker[awayPicker].indexOfLosingTeam = USERS[awayPicker].pickOrder.indexOf(game.away.nameSeo);
				}
			} else {
				newWinTotal[awayPicker]++;
				newFinalizedGames[game.home.nameSeo] = createPick(false, homePicker);
				newFinalizedGames[game.away.nameSeo] = createPick(true, awayPicker);
				if (USERS[homePicker].pickOrder.indexOf(game.home.nameSeo) < newTiebreaker[homePicker].indexOfLosingTeam) {
					newTiebreaker[homePicker].indexOfLosingTeam = USERS[homePicker].pickOrder.indexOf(game.home.nameSeo);
				}
			}
			newGamesRemaining[homePicker]--;
			newGamesRemaining[awayPicker]--;
		});
		
		var sortArray = [];
		// determine current tiebreaker order from indexes
		// then sort, then assign ordering
		Object.keys(newTiebreaker).forEach ( function(key) {
			sortArray.push({key: key, value: newTiebreaker[key].indexOfLosingTeam});
		});
		sortArray.sort(function(a, b) {
			if (a.value < b.value) {
				return 1;
			}
			if (a.value > b.value) {
				return -1;
			}
			return 0;
		});
		sortArray.forEach( function(item, index) {
			// tied on tiebreaker, same value as previous 
			if (index > 0 && item.value === sortArray[index-1].value) {
				newTiebreaker[item.key].order = newTiebreaker[sortArray[index-1].key].order;
			} else {
			// not tied on tiebreaker
				newTiebreaker[item.key] = index+1;
			}
		});
		
		state.winTotal = Object.assign({}, state.winTotal, newWinTotal);
		state.userPicks = Object.assign({}, state.userPicks, newFinalizedGames);	
		state.gamesRemaining = Object.assign({}, state.gamesRemaining, newGamesRemaining);
		state.tiebreaker = Object.assign({}, state.tiebreaker, newTiebreaker);
		return state;
	default:
	}
	return state;
}