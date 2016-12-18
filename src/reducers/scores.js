// seems a little awkward
const initialState = {};
export default function(state = initialState, action) {
	switch (action.type) {
	case 'REFRESH_SCORES':
		return Object.assign({}, state, action.payload.scores)
		break;
	case 'INITIALIZE_GAMES':
		return Object.assign({}, state, action.payload.scores);
		break;
	default:
	}
	return state;


}