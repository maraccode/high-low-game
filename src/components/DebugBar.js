import React from 'react';

const TopBar = ({ prevRank, nextRank, win, bet }) => {
	return (
		<div className='bar ctrl'>
			<span>prevRank {prevRank}</span>
			<span> | </span>
			<span>nextRank {nextRank}</span>
			<span> | </span>
			<span>{win !== null ? (win ? 'you win $' + bet.coin * 2 : 'you loose, starting new game') : ' '}</span>
		</div>
	);
};

export default TopBar;
