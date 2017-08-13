window.meli = window.meli || {};

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
    this.categories = response.categories;
    this.results = response.results.map(function (result) {
      var currency = result.price.currency === 'ARS' ? '' : result.price.currency;
      var decimalsInt = result.price.decimals;
      var decimalsString = result.price.decimals.toString();
      return {
        id: result.id,
        price: currency + '$ ' + result.price.amount.toString(),
        decimals: decimalsInt < 10 ? '0' + decimalsString : decimalsString,
        free_shipping: result.free_shiping,
        address: result.address,
        title: result.title,
        picture: result.picture
      }
    });
    this.render();
  },


  previewResults: function () {
    return {
      categories: ['&nbsp;'],
      results: [{}, {}, {}, {}]
    }
  },

  render: function () {
    var html;
    if (this.template && this.results) {
      html = this.template({categories: this.categories, results: this.results});
      this.$el.html(html);
      this.$el.removeClass('preview');
    } else if (this.template) {
      html = this.template(this.previewResults());
      this.$el.html(html);
      this.$el.addClass('preview');
    }
  }
});
