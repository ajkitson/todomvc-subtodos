/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI. It is mostly
	// a container for the root todo list view
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#todoroot',

		// Initialize root todo list and retrieve it from local storage
		initialize: function () {
			this.rootListView = new app.ListView({
				collection: app.todos
			});
			app.todos.fetch({reset: true});
			this.render();
		},

		render: function () {
			this.$el.html(this.rootListView.render().el);
		},

	});
})(jQuery);
