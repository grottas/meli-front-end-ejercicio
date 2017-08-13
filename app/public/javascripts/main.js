window.meli = {};

window.meli.ItemsView = Backbone.View.extend({
  templateUrl: '/javascripts/views/partials/items.ejs',
  itemsApiUrl: '/api/items?q=:query',

  initialize: function (query){
    $('#main').append(this.$el);
    $.get(this.templateUrl, _.bind(this.readTemplate, this));
    var queryUrl = this.itemsApiUrl.replace(':query', query);
    $.get(queryUrl, _.bind(this.readResults, this));
  },

  readTemplate: function (response) {
    this.template = _.template(response);
    this.render();
  },

  readResults: function (response) {
    this.results = response;

    this.render();
  },

  render: function () {
    if (this.template && this.results) {
      console.log(this.results);
      var html = this.template(this.results);
      this.$el.html(html);
    }
  }
});

window.meli.ItemView = Backbone.View.extend({
  templateUrl: '/javascripts/views/partials/item.ejs',
  itemsApiUrl: '/api/items/:itemId',

  initialize: function (itemId) {
    $('#main').append(this.$el);
    $.get(this.templateUrl, _.bind(this.readTemplate, this));
    var queryUrl = this.itemsApiUrl.replace(':itemId', itemId);
    $.get(queryUrl, _.bind(this.readResults, this)).fail(_.bind(this.render404, this));
  },

  readTemplate: function (response) {
    this.template = _.template(response);
    this.render();
  },

  readResults: function (response) {
    this.results = response.item;
    this.render();
  },

  render: function () {
    if (this.template && this.results) {
      console.log(this.results);
      var html = this.template(this.results);
      this.$el.html(html);
    }
  },

  render404: function () {
  }
});
