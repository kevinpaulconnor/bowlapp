var keyedPicks = {};

const initialState = {
	schex: createUser('./users/schex.jpg', [
		'stanford', 'michigan', 'boise-st', 'air-force', 'ohio', 'southern-california', 'north-carolina-st',
		'louisville', 'boston-college', 'toledo', 'utsa', 'colorado-st', 'southern-miss',
		'northwestern', 'army', 'arkansas-st', 'western-mich', 'miami-oh', 'old-dominion', 'louisiana-tech'
	],
	'schex'),
	dan: createUser('./users/dan.jpg', [
		'navy', 'pittsburgh', 'oklahoma', 'washington-st', 'georgia-tech', 'memphis', 'hawaii', 'mississippi-st',
		'ucf', 'south-fla', 'clemson', 'central-mich', 'san-diego-st', 'baylor', 'troy',
		'vanderbilt', 'arkansas', 'appalachian-st', 'miami-fl', 'indiana'
	],
	'dan'),
	pat: createUser('./users/pat.jpg', [
		'alabama', 'houston', 'oklahoma-st', 'wisconsin', 'lsu', 'virginia-tech', 'georgia', 'north-texas',
		'kansas-st', 'eastern-mich', 'la-lafayette', 'south-carolina', 'auburn', 'middle-tenn',
		 'wake-forest', 'wyoming', 'nebraska', 'iowa', 'north-carolina', 'minnesota'
	],
	'pat'),
	kevin: createUser('./users/kevin.jpg', [
		'utah', 'new-mexico', 'tennessee', 'florida', 'temple', 'west-virginia', 'ohio-st', 'byu',
		'penn-st', 'idaho', 'texas-am', 'colorado', 'florida-st', 'tcu', 'tulsa',
		'western-ky', 'kentucky', 'south-ala', 'washington', 'maryland'
	],'kevin'),
	// error defaults :)
	//michigan: createUser('./users/michigan.png', [], 'michigan')
}

function createUser(imageUrl, picksArray, name) {

	function assignPicks (picksArray, name) {
		var ret = [];
		picksArray.forEach( function(pick) {
			var pickObject = {
				selected: true,
				result: undefined,
				pick: pick,
				name: name
			}
			ret.push(pickObject);
			keyedPicks[pick] = pickObject;
		});
		return ret;
	}

	return ({
		image: require(imageUrl),
		picks: assignPicks(picksArray, name),
		winTotal: 0
	});
}

export default function(state = initialState, action) {
	switch (action.type) {
	case 'REFRESH_SCORES':
	case 'INITIALIZE_GAMES':
		// FIXME Feel like I'm doing too much work here...
		var mergingUsersObject = {};
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
		}
		return state;
		break;
	default:
	}
	return state;
}