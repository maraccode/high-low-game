import React from 'react';

const BottomBar = ({ blockUI, msg, betCoin, onBetCoins, onPlaceBet }) => {
	return (
		<>
			<div className='bar msg'>
				<span>{msg}</span>
			</div>
			<div className='bar bottom'>
				<button className='btn high' value={1} disabled={blockUI} onClick={onPlaceBet}>
					▲ High
				</button>
				<input type='text' value={betCoin} disabled={blockUI} onChange={onBetCoins} />
				<button className='btn low	' value={0} disabled={blockUI} onClick={onPlaceBet}>
					Low ▼
				</button>
			</div>
		</>
	);
};

export default BottomBar;
