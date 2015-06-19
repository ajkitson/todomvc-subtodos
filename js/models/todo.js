/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Todo = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: function () {
			return {
				title: '',
				completed: false,
				subtasks: new app.Todos()
			};
		},

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		},

		parse: function (data) {
			if (Array.isArray(data.subtasks)) {
				data.subtasks = new app.Todos(data.subtasks);
			}
			return data;
		}

	});
})();
