import { combineReducers } from 'redux';
import highLowReducer from '../reducers/highLowReducer';
import pixiReducer from '../reducers/pixiReducer';

export default combineReducers({
	highlow: highLowReducer,
	pixi: pixiReducer,
});
