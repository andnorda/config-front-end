var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Router = require('./router');
new Router();

Backbone.history.start();
