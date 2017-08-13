window.meli = window.meli || {};

window.meli.ItemView = Backbone.View.extend({
  el: '#main',
  templateUrl: '/ejs/item.ejs',
  itemsApiUrl: '/api/items/:itemId',
  title: ':title - :currency $ :price en Mercado Libre',

  initialize: function (itemId) {
    $.get(this.templateUrl, _.bind(this.readTemplate, this));
    var queryUrl = this.itemsApiUrl.replace(':itemId', itemId);
    $.get(queryUrl, _.bind(this.readResults, this));
  },

  readTemplate: function (response) {
    this.template = _.template(response);
    this.render();
  },

  readResults: function (response) {
    var item = response.item;
    this.updateTitle(item);

    var condition = item.condition === 'new' ? 'Nuevo' : 'Usado';
    var amountSoldString = item.sold_quantity === 1 ? ' vendido' :  ' vendidos';
    var currency = item.price.currency === 'ARS' ? '' : item.price.currency;
    var amountString = item.price.amount.toString();
    var decimalsInt = item.price.decimals;
    var decimalsString = item.price.decimals.toString();
    this.item = {
      conditionAndSoldQuantity: condition + ' - ' + item.sold_quantity.toString() + amountSoldString,
      title: item.title,
      picture: item.picture,
      description: item.description,
      price: currency + '$ ' + amountString,
      decimals: decimalsInt < 10 ? '0' + decimalsString : decimalsString
    };
    this.categories = item.categories;
    this.render();
  },

  previewItem: function () {
    return {
      categories: ['&nbsp'],
      item: {}
    }
  },

  render: function () {
    var html;
    if (this.template && this.item) {
      html = this.template({item: this.item, categories: this.categories});
      this.$el.html(html);
      this.$el.removeClass('preview');
    } else if (this.template) {
      html = this.template(this.previewItem());
      this.$el.html(html);
      this.$el.addClass('preview');
    }
  },

  updateTitle: function (item) {
    var newTitle = this.title.replace(':title', item.title);
    newTitle = newTitle.replace(':currency ', item.price.currency === 'ARS' ? '' : item.price.currency);
    var amountString = item.price.amount.toString();
    var decimalsString = item.price.decimals < 9 ? '0' + item.price.decimals.toString() : item.price.decimals.toString();
    newTitle = newTitle.replace(':price', amountString + ',' + decimalsString);
    $('title').text(newTitle);
  }

});
