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

		initialize: function () {
			this.listenTo(this.get('subtasks'), 'change:completed', this.checkDone);
		},

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		},

		parse: function (data) {
			if (Array.isArray(data.subtasks)) {
				var existingSubtasks = this.get('subtasks');
				data.subtasks = existingSubtasks || new app.Todos(data.subtasks);
			}
			return data;
		},

		checkDone: function () {
			if (this.get('completed')) {
				return;
			}

			var subtasks = this.get('subtasks');
			var allComplete = subtasks.every(function (subtask) {
				return subtask.get('completed');
			});

			if (subtasks.length && allComplete) {
				this.set('completed', true);
			}

		}

	});
})();
