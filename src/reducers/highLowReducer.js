const starterDeck = [
	'1c',
	'2c',
	'3c',
	'4c',
	'5c',
	'6c',
	'7c',
	'8c',
	'9c',
	'10c',
	'12c',
	'13c',
	'14c',
	'1d',
	'2d',
	'3d',
	'4d',
	'5d',
	'6d',
	'7d',
	'8d',
	'9d',
	'10d',
	'12d',
	'13d',
	'14d',
	'1h',
	'2h',
	'3h',
	'4h',
	'5h',
	'6h',
	'7h',
	'8h',
	'9h',
	'10h',
	'12h',
	'13h',
	'14h',
	'1s',
	'2s',
	'3s',
	'4s',
	'5s',
	'6s',
	'7s',
	'8s',
	'9s',
	'10s',
	'12s',
	'13s',
	'14s',
];

const lclStore = window.localStorage;
//lclStore.clear();
lclStore.hiLowState && console.log(JSON.parse(lclStore.hiLowState), 'lclStore');

const defaultStateObject = {
	coin: 100,
	deck: starterDeck,
	bet: {
		coin: 10,
		next: null,
	},
	win: null,
	nextRank: null,
	prevRank: null,
	spritesLoaded: false,
};
const defaultState = () => defaultStateObject;

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

const highLowReducer = (state = defaultState(), action) => {
	switch (action.type) {
		case 'RESTORE_GAME': {
			return action.savedState;
		}
		case 'RESET_GAME': {
			const newState = defaultState();
			const initDeck = shuffleArray([...starterDeck]);
			const initCard = initDeck.pop();
			const ret = { ...newState, deck: initDeck, prevRank: initCard };
			lclStore.setItem('hiLowState', JSON.stringify(ret));
			return ret;
		}
		case 'NEW_GAME': {
			const newState = defaultState();
			const initDeck = shuffleArray([...starterDeck]);
			const initCard = initDeck.pop();
			const ret = { ...newState, deck: initDeck, prevRank: initCard, coin: state.coin };
			lclStore.setItem('hiLowState', JSON.stringify(ret));
			return ret;
		}
		case 'PLACE_BET': {
			const { coin, next } = action;
			const newDeck = shuffleArray([...state.deck]);
			const nextCard = newDeck.pop();
			//console.log(next ? 'bet high' : 'bet low', 'next: ' + next, 'nextRank: ' + nextCard, 'prevRank: ' + state.prevRank);
			const ret = {
				...state,
				deck: newDeck,
				coin: state.coin - coin,
				win: null,
				bet: { coin, next },
				nextRank: nextCard,
			};
			lclStore.setItem('hiLowState', JSON.stringify({ ...ret, nextRank: null, prevRank: nextCard }));
			return ret;
		}
		case 'HIGH_OR_LOW': {
			const prevRank = Number(state.prevRank.length > 2 ? state.prevRank.slice(0, 2) : state.prevRank.slice(0, 1));
			const nextRank = Number(state.nextRank.length > 2 ? state.nextRank.slice(0, 2) : state.nextRank.slice(0, 1));
			const win = prevRank === nextRank ? true : state.bet.next ? prevRank < nextRank : prevRank > nextRank;
			// console.log(
			// 	'win: ' + win,
			// 	'state.bet.next: ' + state.bet.next,
			// 	'prevRank: ' + prevRank,
			// 	'nextRank: ' + nextRank,
			// 	'prevRank < nextRank: ' + prevRank < nextRank,
			// 	'prevRank > nextRank: ' + prevRank > nextRank
			// );
			const ret = {
				...state,
				coin: win ? state.coin + state.bet.coin * 2 : state.coin,
				win: win,
				prevRank: state.nextRank ? state.nextRank : state.prevRank,
			};
			lclStore.setItem('hiLowState', JSON.stringify({ ...ret, nextRank: null }));
			return ret;
		}
		default:
			return state;
	}
};

export default highLowReducer;
