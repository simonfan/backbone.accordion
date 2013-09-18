define(['backbone.statefulview','underscore'], function(StatefulView, undef) {

	var Accordion = StatefulView.extend({
		initialize: function(options) {
			StatefulView.prototype.initialize.call(this, options);

			this.contentSelector = options.contentSelector;
			this.frameSelector = options.frameSelector;
		},

		open: function(what) {
			return this.swtch({ open: _.isArray(what) ? what : '.' });
		},

		close: function(what) {
			return this.swtch({ close: _.isArray(what) ? what : '.' });
		},

		to: function(frames, axis, options, insist) {
			var frames = _.isArray(frames) ? frames : [ frames ],
				closeSelector = this.frameSelector + ':not(' + frames.join(',') + ')';

			return this.swtch({
				open: frames,
				close: closeSelector,
			}, axis, options, insist);
		},

		swtch: function(states, axis, options, insist) {
			var open = _.isArray(states.open) ? states.open : [states.open],
				close = _.isArray(states.close) ? states.close : [states.close],
				axis = _.isUndefined(axis) ? 'Y' : axis,
				openState = _.map(axis, function(axis) {
					return 'open' + axis.toUpperCase();
				}),
				closeState = _.map(axis, function(axis) {
					return 'close' + axis.toUpperCase();
				}),
				scene = {};

			_.each(open, function(frame, index) {scene[ frame ] = openState; });

			_.each(close, function(frame, index) { scene[ frame ] = closeState; });

			return this.scene(scene, options, insist);
		},

		states: {
			openX: {
				before: { display: 'block' },
				state: {
					width: function($el) { return $el.find(this.contentSelector).outerWidth(); },
					opacity: 1,
				},
			},

			closeX: {
				state: {
					width: 0,
					opacity: 0,
				},
				after: { display: 'none' }
			},

			openY: {
				before: { display: 'block' },
				state: {
					height: function($el) { return $el.find(this.contentSelector).outerHeight(); },
					opacity: 1,
				}
			},

			closeY: {
				state: {
					height: 0,
					opacity: 0,
				},
				after: { display: 'none' },
			},
		},
	});

	return Accordion;
});