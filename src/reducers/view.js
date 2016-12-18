// seems a little awkward
const initialState = {
	currentView: 'Games',
	otherView: 'Standings'
}
export default function(state = initialState, action) {
	switch (action.type) {
	case 'CHANGE_VIEW':
			var temp = state.currentView;
			return {
				currentView: state.otherView,
				otherView: temp
			}
	default:
	}
	return state;


}