Articles = new Meteor.Collection('articles');

Router.route('/', function () {
  this.layout('Layout');
  this.render('Blog');
});

Router.route('/blog/new', function () {
  this.layout('Layout');
  this.render('ArticleNew');
});


Router.route('/blog/:_id', function () {
  //debugger; 
  console.dir("does this print?"); 
  console.log('id: ' + this.params._id);
  console.log('query.q1: ' + this.params.query.q1);
  console.log('query.q2: ' + this.params.query.q2);
  console.dir(this.params);
  this.layout('Layout');
  this.render('Article');
});

if (Meteor.isClient) {
  Template.Blog.articles = function () { return Articles.find() };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Articles.remove({}); 
    for (var i=0; i<3; i++) {
      Articles.insert({
        title: 'Blog Article ' + i,
        body: 'This is text body.',
        createdAt: new Date,
        author: 'Stevo'
      });
    }

  });
}