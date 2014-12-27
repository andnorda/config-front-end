var Backbone = require('backbone');

var InstanceModel = Backbone.Model.extend({
	idAttribute: 'name',

	initialize: function(options) {
		this.application = options.application;
		this.version = options.version;
		this.instance = options.instance;
	},

	urlRoot: function() {
		var url = '/rest/applications/' + this.application;
		if (this.version) {
			url += '/versions/' + this.version;

			if (this.instance) {
				url += '/instances/' + this.instance;
			}
		}
		return url + '/files/';
	}
});

module.exports = InstanceModel;