var initialState = {
	data: {}
}
for (var i = 1; i<=80; i++) {
		initialState.data[i] = Math.floor(Math.random() * (50 - 0)) + 0
}
export default function(state = initialState, action) {
	switch (action.type) {
	case 'REQUEST_UPDATE':
		console.log(action.payload);
		console.log(state);
		return { ...state, data: action.payload }
		break;
	default:
	}
	return state;


}