var Backbone = require('backbone');

var ApplicationModel = Backbone.Model.extend({
	idAttribute: 'name',

	urlRoot: '/rest/applications'
});

module.exports = ApplicationModel;