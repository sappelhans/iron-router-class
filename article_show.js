ArticleShowController = RouteController.extend({
	template: 'Article',

	subscriptions: function () {
		Meteor.subscribe('article', this.params._id);
	},

	data: function () {
		return Articles.findOne({_id: this.param._id});
	}
});