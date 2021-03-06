/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
  'use strict';

  // The Application
  // ---------------
  app.todos = new app.Todos();
  app.isRoot = function (collection) {
    return app.todos === collection;
  };

  // Our overall **AppView** is the top-level piece of UI. It is mostly
  // a container for the root todo list view
  app.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#todoapp',

    // Our template for the line of statistics at the bottom of the list
    statsTemplate: _.template($('#stats-template').html()),

    events: {
      'click #clear-completed': 'clearCompleted',
    },

    // Initialize root todo list and retrieve it from local storage
    initialize: function () {
      this.rootListView = new app.ListView({
        collection: app.todos
      });
      this.$list = this.$('#rootlist');
      this.$list.html(this.rootListView.render().el);

      this.$footer = this.$('#footer');

      app.todos.fetch({ reset: true });
      this.listenTo(app.todos, 'all', _.debounce(this.render, 0));
      this.render();
    },

    // We just need to update footer stats on render. The list view
    // in this.$list takes care of itself once it's on the DOM
    render: function () {
      var completed = app.todos.completed().length;
      var remaining = app.todos.remaining().length;

      // update footer
      if (app.todos.length) {
        this.$footer.show();
        this.$footer.html(this.statsTemplate({
          completed: completed,
          remaining: remaining
        }));

        this.$('#filters li a')
          .removeClass('selected')
          .filter('[href="#/' + (app.TodoFilter || '') + '"]')
          .addClass('selected');

      } else {
        this.$footer.hide();
      }
    },

    // Clear all completed todo items, destroying their models.
    clearCompleted: function () {
      _.invoke(app.todos.completed(), 'destroy');
      return false;
    },

  });
})(jQuery);
