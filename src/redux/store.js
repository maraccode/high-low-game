import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = (store) => (next) => (action) => {
	console.groupCollapsed(action.type);
	console.log('Previous state', store.getState());
	console.info('Dispatch', action);
	let result = next(action);
	console.log('Next state', store.getState());
	console.groupEnd(action.type);
	return result;
};

const initialState = {};
const enhancers = [];
const middleware = [thunk, logger]; // thunk,

//console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
if (process.env.NODE_ENV === 'development') {
	const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
