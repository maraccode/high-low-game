import * as PIXI from 'pixi.js';

Object.defineProperties(PIXI.Sprite.prototype, {
	scaleX: {
		get: function () {
			return this.scale.x;
		},
		set: function (v) {
			this.scale.x = v;
		},
	},
	scaleY: {
		get: function () {
			return this.scale.y;
		},
		set: function (v) {
			this.scale.y = v;
		},
	},
});
