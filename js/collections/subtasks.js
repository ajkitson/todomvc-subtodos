/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  // Subtask Collection
  // ---------------

  // Subtasks is just like Todos, but it saves to a different namespace in
  // local storage. If fetching from local storage were more flexible (e.g.
  // we could request just top-level todos), we wouldn't need this.
  app.Subtasks = app.Todos.extend({
    localStorage: new Backbone.LocalStorage('todos-subtasks-backbone')
  });

})();
