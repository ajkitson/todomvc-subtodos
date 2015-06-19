/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  app.Todos = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: app.Todo,

    // Save all of the todo items under the `"todos"` namespace.
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // Filter down the list of all todo items that are finished.
    completed: function () {
      return this.where({completed: true});
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function () {
      return this.where({completed: false});
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function () {
      return this.length ? this.last().get('order') + 1 : 1;
    },

    // We have this because local storage doesn't allow us to just fetch
    // tasks for a specific collection. Instead, we get all of them and
    // filter them here, moving subtasks onto the appropriate top-level tasks.
    moveSubtasks: function () {
      // Remove any existing nested subtasks (which will not have been
      // initialized properly anyway). But keep the same collection so
      // we preserve event bindings
      this.each(function (task) {
        var subtasks = task.get('subtasks');
        subtasks.remove(subtasks.models);
      });

      // Remove subtasks from top-level collection
      var subtasks = this.filter(function (task) {
        return task.get('isSubtask');
      });
      this.remove(subtasks);

      // Add subtasks to the correct parent
      subtasks.forEach(function (subtask) {
        var parent = this.get(subtask.get('parentID'));
        if (parent) {
          parent.get('subtasks').add(subtask);
        }
      }.bind(this));

    },

    // Todos are sorted by their original insertion order.
    comparator: 'order'
  });

})();
