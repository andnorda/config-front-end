var Backbone = require('backbone');

var VersionModel = Backbone.Model.extend({
	idAttribute: 'name',

	initialize: function(options) {
		this.application = options.application;
	},

	urlRoot: function() {
		return '/rest/applications/' + this.application + '/versions/';
	}
});

module.exports = VersionModel;