import { combineReducers } from 'redux';
import ScoresReducer from './scores';
import GamesReducer from './games';

const rootReducer = combineReducers({  
  games: GamesReducer,
  scores: ScoresReducer
});

export default rootReducer;