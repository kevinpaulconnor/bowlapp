import { combineReducers } from 'redux';
import ScoresReducer from './scores';
import GamesReducer from './games';

const rootReducer = combineReducers({
  scores: ScoresReducer,
  games: GamesReducer
});

export default rootReducer;