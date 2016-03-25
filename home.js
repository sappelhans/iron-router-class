HomeController = RouteController.extend({
	
	template: 'Blog',

	subscriptions: function () {
		return [Meteor.subscribe('articles')];
	},

	articles: function () {
		return Articles.find();
	},

	action: function () {
		if (this.ready())
			this.render();
		else
			this.render('Loading');
	}
});