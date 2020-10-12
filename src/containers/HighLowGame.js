import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetGame, newGame, placeBet, highOrLow, restoreGame } from '../actions/highLowActions';
import PixiFlip from '../components/PixiFlip';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import DebugBar from '../components/DebugBar';

class HighLowGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			betCoin: 0,
			msg: '',
			blockUI: false,
		};
	}
	componentDidMount() {
		if (window.localStorage && window.localStorage.hilowState) {
			const savedState = JSON.parse(window.localStorage.hilowState);
			this.props.restoreGame(savedState);
			this.setState({ betCoin: savedState.bet.coin });
		} else {
			this.props.resetGame();
			this.setState({ betCoin: this.props.bet.coin });
		}
	}

	componentDidUpdate = () => {
		if (this.props.win === false) setTimeout(this.onNewGame, 2000);
	};

	onBetCoins = (e) => {
		const { coin } = this.props;
		if (e.target.value <= coin) {
			this.setState({ betCoin: e.target.value });
		} else {
			this.setState({ msg: 'max amount is ' + coin });
			setTimeout(this.removeMsg, 1000);
		}
	};
	removeMsg = () => {
		this.setState({ msg: '' });
	};
	onPlaceBet = (e) => {
		const { betCoin } = this.state;
		this.props.placeBet(betCoin, Number(e.target.value));
		this.setState({ blockUI: true });
	};
	onResetGame = () => {
		this.props.resetGame();
		this.setState({ betCoin: this.props.bet.coin });
	};
	onNewGame = () => {
		if (this.props.coin === 0) {
			this.onResetGame();
		} else {
			this.props.newGame();
		}
	};
	unBlockUI = () => {
		this.setState({ blockUI: false });
	};

	render() {
		const { coin, nextRank, prevRank, win, bet } = this.props;

		const { betCoin, blockUI, msg } = this.state;
		return (
			<div className='game-wrapper'>
				<TopBar coin={coin} blockUI={blockUI} onResetGame={this.onResetGame} onNewGame={this.onNewGame} />

				{process.env.NODE_ENV === 'development' && <DebugBar prevRank={prevRank} nextRank={nextRank} win={win} bet={bet} />}

				<PixiFlip coin={coin} prevRank={prevRank} nextRank={nextRank} win={win} unBlockUI={this.unBlockUI} />

				<BottomBar betCoin={betCoin} msg={msg} onBetCoins={this.onBetCoins} onPlaceBet={this.onPlaceBet} />
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return state.highlow;
};
let mapDispatchToProps = (dispatch) => ({
	restoreGame: (savedState) => dispatch(restoreGame(savedState)),
	resetGame: () => dispatch(resetGame()),
	newGame: () => dispatch(newGame()),
	placeBet: (coin, next) => {
		dispatch(placeBet(coin, next));
		setTimeout(dispatch, 1000, highOrLow());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(HighLowGame);
