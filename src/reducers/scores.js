// seems a little awkward
var initialState = scoreInitializer();
function scoreInitializer() {
	var state = {
		data: {}
	};
	for (var i = 1; i<=80; i++) {
		state.data[i] = "-";
	}
	return state;
}
export default function(state = scoreInitializer(), action) {
	switch (action.type) {
	case 'REFRESH_SCORES':
		return [ ...state.data = action.payload ]
		break;
	default:
	}
	return state;


}