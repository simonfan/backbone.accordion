define(['backbone.accordion','backbone','jquery'], function(Accordion, Backbone, $) {

	window.accordion = new Accordion({
		el: $('.accordion-wrapper'),
		contentSelector: '.accordion-content',
		frameSelector: '.accordion-frame',
	})	

});