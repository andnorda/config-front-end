var $ = require('jquery');
var backbone = require('backbone');

/*global ConfigFrontEnd, $*/
window.ConfigFrontEnd = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
    }
};

$(document).ready(function () {
    'use strict';
    ConfigFrontEnd.init();
});
