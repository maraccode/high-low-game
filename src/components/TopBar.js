import React from 'react';

const TopBar = ({ blockUI, coin, onResetGame, onNewGame }) => {
	return (
		<div className='bar top'>
			<div className='score'>
				<span>$ {coin}</span>
			</div>
			<div>
				<button className='btn' disabled={blockUI} onClick={onResetGame}>
					Reset
				</button>
				<button className='btn' disabled={blockUI} onClick={onNewGame}>
					New game
				</button>
			</div>
		</div>
	);
};

export default TopBar;
