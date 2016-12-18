const initialState = {
	userPicks: {
		schex:createUserPicks([
		'stanford', 'michigan', 'boise-st', 'air-force', 'ohio', 'southern-california', 'north-carolina-st',
		'louisville', 'boston-college', 'toledo', 'utsa', 'colorado-st', 'southern-miss',
		'northwestern', 'army', 'arkansas-st', 'western-mich', 'miami-oh', 'old-dominion', 'louisiana-tech'
		]),
		dan:createUserPicks([
		'navy', 'pittsburgh', 'oklahoma', 'washington-st', 'georgia-tech', 'memphis', 'hawaii', 'mississippi-st',
		'ucf', 'south-fla', 'clemson', 'central-mich', 'san-diego-st', 'baylor', 'troy',
		'vanderbilt', 'arkansas', 'appalachian-st', 'miami-fl', 'indiana'
	]),
		pat:createUserPicks([
		'alabama', 'houston', 'oklahoma-st', 'wisconsin', 'lsu', 'virginia-tech', 'georgia', 'north-texas',
		'kansas-st', 'eastern-mich', 'la-lafayette', 'south-carolina', 'auburn', 'middle-tenn',
		 'wake-forest', 'wyoming', 'nebraska', 'iowa', 'north-carolina', 'minnesota'
	]),
		kevin:createUserPicks([
		'utah', 'new-mexico', 'tennessee', 'florida', 'temple', 'west-virginia', 'ohio-st', 'byu',
		'penn-st', 'idaho', 'texas-am', 'colorado', 'florida-st', 'tcu', 'tulsa',
		'western-ky', 'kentucky', 'south-ala', 'washington', 'maryland'
	]),
	},
	winTotal: {
		schex: 0,
		dan: 0,
		pat: 0,
		kevin: 0
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

export const USERS = {
	schex: {
		image: require('./users/schex.jpg'),
		picks: [ 'stanford', 'michigan', 'boise-st', 'air-force', 'ohio', 'southern-california',
		'north-carolina-st', 'louisville', 'boston-college', 'toledo', 'utsa', 'colorado-st', 'southern-miss',
		'northwestern', 'army', 'arkansas-st', 'western-mich', 'miami-oh', 'old-dominion', 'louisiana-tech'
		]
	},
	dan: {
		image: require('./users/dan.jpg'),
		picks: ['navy', 'pittsburgh', 'oklahoma', 'washington-st', 'georgia-tech', 'memphis',
		'hawaii', 'mississippi-st', 'ucf', 'south-fla', 'clemson', 'central-mich', 'san-diego-st',
		'baylor', 'troy','vanderbilt', 'arkansas', 'appalachian-st', 'miami-fl', 'indiana'
		]
	},
	pat: {
		image: require('./users/pat.jpg'),
		picks: ['alabama', 'houston', 'oklahoma-st', 'wisconsin', 'lsu', 'virginia-tech', 'georgia', 'north-texas',
		'kansas-st', 'eastern-mich', 'la-lafayette', 'south-carolina', 'auburn', 'middle-tenn',
		'wake-forest', 'wyoming', 'nebraska', 'iowa', 'north-carolina', 'minnesota'
		]
	},
	kevin: {
		image: require('./users/kevin.jpg'),
		picks: ['utah', 'new-mexico', 'tennessee', 'florida', 'temple', 'west-virginia', 'ohio-st',
		'byu','penn-st', 'idaho', 'texas-am', 'colorado', 'florida-st', 'tcu', 'tulsa',
		'western-ky', 'kentucky', 'south-ala', 'washington', 'maryland'
		]
	}
	/*michigan: {
		image: require('./users/michigan.png'),
		picks: []
	}*/
}

export const PICKTOUSER = (function() {
	var ret = {};
	Object.keys(USERS).forEach ( function(userKey) {
		var user = USERS[userKey];
		Object.keys(user.picks).forEach( function (pickKey) {
			
			ret[user.picks[pickKey]] = userKey;
		});
	});
	return ret;
})();

export default function(state = initialState, action) {
	switch (action.type) {
	case 'REFRESH_SCORES':
	case 'INITIALIZE_GAMES':
		// FIXME Feel like I'm doing too much work here...
		/*var mergingUsersObject = {};
		var pickers = {
			schex: [],
			dan: [],
			pat: [],
			kevin: []
		}
		action.payload.finalizedGames.forEach( function(game) {
				var homePicker = keyedPicks[game.home.nameSeo];
				var awayPicker = keyedPicks[game.away.nameSeo];
				console.log(homePicker);
				pickers[homePicker.name].push({
					pick: game.home.nameSeo,
					result: (game.home.winner == "true")
				});
				pickers[awayPicker.name].push({
					pick: game.away.nameSeo,
					result: (game.away.winner == "true")
				})
			}
		);
	
		for (var user in pickers) {
			var newTotalWins = state[user].winTotal;
			var self = user;
			pickers[user].forEach( function (pick) {
				if (pick.result === true) {
					newTotalWins++;
				}
				var pickToUpdate = state[self].picks.indexOf(keyedPicks[pick.pick])
				//state.dan.picks.indexOf(keyedPicks["washington-st"])
				state[self].picks[pickToUpdate] = Object.assign({}, state[self].picks[pickToUpdate], pick)
			})
			state[self] = Object.assign({}, state[self], {winTotal: newTotalWins});
		}*/
		return state;
		break;
	default:
	}
	return state;
}