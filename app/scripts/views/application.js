var Backbone = require('backbone');
var template = require('../templates/application.hbs');

var ApplicationView = Backbone.View.extend({
	tagName: 'section',
	
	render: function() {
		this.$el.html('<h1>what</h1>');
		return this;
	}
});

module.exports = ApplicationView;