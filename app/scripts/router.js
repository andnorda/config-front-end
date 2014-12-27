var $ = require('jquery');
var Backbone = require('backbone');

var ApplicationListView = require('./views/application-list');
var ApplicationCollection = require('./collections/application');

var ApplicationView = require('./views/application');
var ApplicationModel = require('./models/application');

var VersionView = require('./views/version');
var VersionModel = require('./models/version');

var InstanceView = require('./views/instance');
var InstanceModel = require('./models/instance');

var FileView = require('./views/file');
var FileModel = require('./models/file');

var Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'applications/:application': 'application',
		'applications/:application/versions/:version': 'version',
		'applications/:application/versions/:version/instances/:instance': 'instance',
		'applications/:application/files/:file': 'file',
		'applications/:application/versions/:version/files/:file': 'file',
		'applications/:application/versions/:version/instances/:instance/files/:file': 'file'
	},

	index: function() {
		var applications = new ApplicationCollection();
		applications.fetch();

		var appListView = new ApplicationListView({
			collection: applications
		});
		appListView.render();
		$('#app').html(appListView.el);
	},

	application: function(application) {
		var applicationModel = new ApplicationModel({
			name: application
		});
		applicationModel.fetch();

		var appView = new ApplicationView({
			model: applicationModel
		});
		appView.render();
		$('#app').html(appView.el);
	},

	version: function(application, version) {
		var versionModel = new VersionModel({
			name: version,
			application: application
		});
		versionModel.fetch();

		var versionView = new VersionView({
			model: versionModel
		});
		versionView.render();
		$('#app').html(versionView.el);
	},

	instance: function(application, version, instance) {
		var instanceModel = new InstanceModel({
			name: instance,
			version: version,
			application: application
		});
		instanceModel.fetch();

		var instanceView = new InstanceView({
			model: instanceModel
		});
		instanceView.render();
		$('#app').html(instanceView.el);
	},

	file: function(application, version, instance, file) {
		if (!instance) {
			file = version;
			version = undefined;
		} else if (!file) {
			file = instance;
			instance = undefined;
		}
		var fileModel = new FileModel({
			name: file,
			application: application,
			version: version,
			instance: instance
		});
		fileModel.fetch();

		var fileView = new FileView({
			model: fileModel
		});
		fileView.render();
		$('#app').html(fileView.el);
	}
});

module.exports = Router;