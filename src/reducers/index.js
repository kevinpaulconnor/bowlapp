import { combineReducers } from 'redux';
import ScoresReducer from './scores';
import GamesReducer from './games';
import ViewReducer from './view';
import UserReducer from './users';

const rootReducer = combineReducers({  
  games: GamesReducer,
  scores: ScoresReducer,
  view: ViewReducer,
  users: UserReducer
});

export default rootReducer;