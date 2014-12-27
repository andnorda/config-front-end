var Backbone = require('backbone');
var ApplicationModel = require('../models/application');

var ApplicationCollection = Backbone.Collection.extend({
	model: ApplicationModel,

	url: '/rest/applications'
});

module.exports = ApplicationCollection;