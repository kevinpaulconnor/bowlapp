import { combineReducers } from 'redux';
import ScoresReducer from './scores';
import GamesReducer from './games';
import ViewReducer from './view';

const rootReducer = combineReducers({  
  games: GamesReducer,
  scores: ScoresReducer,
  view: ViewReducer
});

export default rootReducer;