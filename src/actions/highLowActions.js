export const restoreGame = (savedState) => ({
	type: 'RESTORE_GAME',
	savedState,
});
export const resetGame = () => ({
	type: 'RESET_GAME',
});
export const newGame = () => ({
	type: 'NEW_GAME',
});
export const placeBet = (coin, next) => ({
	type: 'PLACE_BET',
	coin,
	next,
});
export const highOrLow = () => ({
	type: 'HIGH_OR_LOW',
});
