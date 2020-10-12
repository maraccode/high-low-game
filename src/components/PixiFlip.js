import React from 'react';
import * as PIXI from 'pixi.js';
import { TweenMax, Linear } from 'gsap';
import '../util/pixiEnhancer';
import { assetsLoaded } from '../actions/pixiActions';
import { connect } from 'react-redux';

const stageHeight = 460; // try with window.innerHeight
const cardHeight = 190;
const cardWidth = 140;
const cardOffset = 10;
const flipSpeed = 0.3;
const winColor = 0x008000;
const loseColor = 0xff0000;

class PixiFlip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			spriteSheetLoaded: false,
		};
	}
	componentDidMount() {
		this.app = new PIXI.Application({
			//backgroundColor: 0x1d7c35,
			backgroundColor: 0xffffff,
			antialias: true,
			width: window.innerWidth,
			height: stageHeight,
			sharedLoader: true,
			sharedTicker: true,
			view: document.getElementById('canvas'),
		});
		// TODO can next two lines be less hacky?
		const assetsLoadedAction = this.props.assetsLoaded;
		PIXI.Loader.shared.add('img/card_deck.json').load(() => {
			assetsLoadedAction();
		});
	}
	componentDidUpdate(prevProps) {
		if (prevProps.win !== this.props.win) {
			const { win } = this.props;
			if (this.textSprite) {
				this.textSprite.text = win !== null ? (win ? 'You win!' : 'You loose, starting new game...') : '';
				this.textSprite.style.fill = win ? winColor : loseColor;
				this.textSprite.x = win ? this.app.view.width / 2 - 40 : this.app.view.width / 2 - 155;
			}
		}
		if (prevProps.spritesLoaded !== this.props.spritesLoaded) {
			this.drawCardScene();
		}
		if (prevProps.nextRank !== this.props.nextRank) {
			this.flipCard();
		}
		if (prevProps.prevRank !== this.props.prevRank && !this.props.nextRank) {
			this.setFace();
		}
	}

	setFace() {
		const { prevRank } = this.props;
		if (this.cardFace) this.cardFace.texture = this.sheet.textures[prevRank + '.png'];
	}

	flipCard() {
		const { prevRank, nextRank } = this.props;
		this.cardFlip.texture = this.sheet.textures['back.png'];
		this.cardFace.texture = this.sheet.textures[prevRank + '.png'];
		this.cardFlip.x = this.cardBack.x;
		this.cardFlip.y = this.cardBack.y;
		const w = this.app.view.width / 2;
		TweenMax.to(this.cardFlip, 0, { x: w + cardWidth + cardOffset, scaleX: -1 });

		if (nextRank) {
			TweenMax.to(this.cardFlip, flipSpeed, {
				x: w + cardOffset + cardWidth / 2,
				y: this.cardFace.y - cardOffset,
				scaleX: 0,
				scaleY: 1.2,
				ease: Linear.easeNone,
				onComplete: () => {
					this.cardFlip.texture = this.sheet.textures[nextRank + '.png'];
				},
			});
			TweenMax.to(this.cardFlip, flipSpeed, {
				x: w + cardOffset,
				y: this.cardBack.y,
				scaleX: 1,
				scaleY: 1,
				ease: Linear.easeNone,
				delay: flipSpeed,
			});
			TweenMax.to(this.cardFlip, flipSpeed, {
				x: this.cardFace.x,
				y: this.cardFace.y,
				ease: Linear.easeNone,
				delay: flipSpeed * 6,
				onComplete: () => {
					this.textSprite.text = '';
					TweenMax.delayedCall(1, this.props.unBlockUI);
				},
			});
		}
	}

	drawCardScene() {
		const { prevRank } = this.props;
		const w = this.app.view.width / 2;
		const h = stageHeight / 2;
		const stage = this.app.stage;

		const sheet = this.app.loader.resources['img/card_deck.json'];
		const cardBack = new PIXI.Sprite(sheet.textures['back.png']);
		cardBack.position.y = h - cardHeight / 2;
		cardBack.position.x = w + cardOffset;

		const cardFace = new PIXI.Sprite(sheet.textures[prevRank + '.png']);
		cardFace.position.y = h - cardHeight / 2;
		cardFace.position.x = w - (cardWidth + cardOffset);

		const cardFlip = new PIXI.Sprite(sheet.textures['back.png']);
		cardFlip.position.y = h - cardHeight / 2;
		cardFlip.position.x = w + cardOffset;

		stage.addChild(cardBack);
		stage.addChild(cardFace);
		stage.addChild(cardFlip);

		TweenMax.to(cardBack, 0, { x: w + cardWidth + cardOffset, scaleX: -1 });
		TweenMax.to(cardFlip, 0, { x: w + cardWidth + cardOffset, scaleX: -1 });
		this.sheet = sheet;
		this.cardBack = cardBack;
		this.cardFace = cardFace;
		this.cardFlip = cardFlip;

		const textSprite = new PIXI.Text('', {
			fontFamily: 'Arial',
			fontSize: 22,
			fill: winColor,
			align: 'center',
		});
		textSprite.position.y = stageHeight / 2 + cardHeight / 2 + cardOffset;
		textSprite.position.x = w - 50;
		this.app.stage.addChild(textSprite);
		this.textSprite = textSprite;
	}

	render() {
		return <canvas id='canvas' />;
	}
}

let mapStateToProps = (state) => {
	return state.pixi;
};
let mapDispatchToProps = (dispatch) => ({
	assetsLoaded: () => dispatch(assetsLoaded()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PixiFlip);
