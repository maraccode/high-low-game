const defaultStateObject = {
	spritesLoaded: false,
};
const defaultState = () => defaultStateObject;

const pixiReducer = (state = defaultState(), action) => {
	switch (action.type) {
		case 'ASSETS_LOADED': {
			return { ...state, spritesLoaded: true };
		}
		default:
			return state;
	}
};

export default pixiReducer;
