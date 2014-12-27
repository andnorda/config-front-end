var $ = require('jquery');
var Backbone = require('backbone');
var ApplicationView = require('./views/application');

var Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'applications/:application': 'application',
		'applications/:application/versions/:version': 'version',
		'applications/:application/versions/:version/instances/:instance': 'instance' 
	},

	index: function() {
		var appView = new ApplicationView();
		appView.render();
		$('#app').html(appView.el);
	},

	application: function(application) {
		console.log('application');
		console.log(application);
	},

	version: function(application, version) {
		console.log('version');
		console.log(application);
		console.log(version);
	},

	instance: function(application, version, instance) {
		console.log('instance');
		console.log(application);
		console.log(version);
		console.log(instance);
	}
});

module.exports = Router;