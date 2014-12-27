var Backbone = require('backbone');

var InstanceModel = Backbone.Model.extend({
	idAttribute: 'name',

	initialize: function(options) {
		this.application = options.application;
		this.version = options.version;
	},

	urlRoot: function() {
		return '/rest/applications/' + this.application + 
			'/versions/' + this.version + '/instances';
	}
});

module.exports = InstanceModel;