// seems a little awkward
const initialState = scoreInitializer();
function scoreInitializer() {
	var state = {};
	for (var i = 1; i<=80; i++) {
		state[i] = "-";
	}
	return state;
}
export default function(state = initialState, action) {
	switch (action.type) {
	case 'REFRESH_SCORES':
		return Object.assign({}, state, action.payload)
		break;
	default:
	}
	return state;


}