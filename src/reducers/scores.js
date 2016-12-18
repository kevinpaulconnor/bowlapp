// seems a little awkward
const initialState = {};
export default function(state = initialState, action) {
	switch (action.type) {
	case 'REFRESH_SCORES':
	case 'INITIALIZE_GAMES':
		return Object.assign({}, state, action.payload.scores);
		break;
	default:
	}
	return state;


}