window.meli = {};

window.meli.ItemsView = Backbone.View.extend({
  el: '#main',
  templateUrl: '/ejs/items.ejs',
  itemsApiUrl: '/api/items?q=:query',

  initialize: function (query){
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
    this.results.preview = false;
    this.render();
  },

  render: function () {
    if (this.template) {
      var html = this.template(this.results || {preview: true});
      this.$el.html(html);
    }
  }
});

window.meli.ItemView = Backbone.View.extend({
  el: '#main',
  templateUrl: '/ejs/item.ejs',
  itemsApiUrl: '/api/items/:itemId',
  title: ':title - :currency $ :price en Mercado Libre',

  initialize: function (itemId) {
    $.get(this.templateUrl, _.bind(this.readTemplate, this));
    var queryUrl = this.itemsApiUrl.replace(':itemId', itemId);
    $.get(queryUrl, _.bind(this.readResults, this)).fail(_.bind(this.render404, this));
  },

  readTemplate: function (response) {
    this.template = _.template(response);
    this.render();
  },

  readResults: function (response) {
    this.item = response.item;
    this.item.preview = false;
    this.updateTitle();
    this.render();
  },

  render: function () {
    if (this.template) {
      var html = this.template(this.item || {preview: true});
      this.$el.html(html);
    }
  },

  updateTitle: function () {
    var newTitle = this.title.replace(':title', this.item.title);
    newTitle = newTitle.replace(':currency ', this.item.price.currency === 'ARS' ? '' : this.item.price.currency);
    var amountString = this.item.price.amount.toString();
    var decimalsString = this.item.price.decimals < 9 ? '0' + this.item.price.decimals.toString() : this.item.price.decimals.toString();
    newTitle = newTitle.replace(':price', amountString + ',' + decimalsString);
    $('title').text(newTitle);
  },

  render404: function () {
  }
});
