define(['backbone.accordion','backbone','jquery'], function(Accordion, Backbone, $) {

	var AccordionView = Accordion.extend({
		events: {
			'click a': 'goTo',
		},

		goTo: function(e) {
			var $target = $(e.currentTarget),
				to = $target.attr('data-to');

			this.to(to);
		}
	})

	window.accordion = new AccordionView({
		el: $('.accordion-wrapper'),
		contentSelector: '.accordion-content',
		frameSelector: '.accordion-frame',
	})	

});