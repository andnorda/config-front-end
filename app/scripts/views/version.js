var Backbone = require('backbone');
var template = require('../templates/version.hbs');

var VersionView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	
	render: function() {
		this.$el.html(template(this.model.toJSON()));
		return this;
	}
});

module.exports = VersionView;