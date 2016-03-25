Articles = new Meteor.Collection('articles');

// Global options for all Routes
Router.configure({
  layoutTemplate: 'Layout'
});


// Router.route('/', function () {
//   this.layout('Layout');
//   this.render('Blog');
// }, {name: 'home'});

Router.route('/', {
  name: 'home',
  template: 'Blog'
  //layoutTemplate: 'Layout'
  // action: function () {
  //   this.layout('Layout');
  //   this.render('Blog');
  // }
});

Router.route('/blog/new', {
  name: 'article.new'
});

// Router.route('/blog/new', function () {
//   this.layout('Layout');
//   this.render('ArticleNew');
// }, {name: 'blog.new'} );


Router.route('/blog/:_id', {
  name: 'article.show',
  template: 'Article',
  data: function () {
    return Articles.findOne({_id: this.params._id})
  }
});

// Router.route('/blog/:_id', function () {
//   //debugger; 
//   // console.dir("does this print?"); 
//   // console.log('id: ' + this.params._id);
//   // console.log('query.q1: ' + this.params.query.q1);
//   // console.log('query.q2: ' + this.params.query.q2);
//   // console.dir(this.params);
//   this.layout('Layout', {
//     data: function () {
//       return Articles.findOne({_id: this.params._id});
//     }
//   });
  
//   this.render('Article', {});
//   // this.render('ArticleBreadcrumbs', {to: 'breadcrumbs'});

// }, {name: 'article.show'} 
// );


if (Meteor.isClient) {

  // Move to Route
  //Meteor.subscribe('articles');

  Template.Blog.helpers({ 
    articles: function () {
      return Articles.find()
    } 
  });
}

if (Meteor.isServer) {

  var Future = Npm.require('fibers/future');

  Meteor.publish('articles', function() {
    var future = new Future;
    setTimeout(Meteor.bindEnvironment(function () {
      future.return(Articles.find());
    }), 3000);
    return future.wait();
  });

  Meteor.publish('article', function (id) {
    return Articles.find({_id: id});
  });

  Meteor.startup(function () {
    Articles.remove({}); 
    //if (Articles.find().count() > 0)
    //  return;

    for (var i=0; i<3; i++) {
      Articles.insert({
        title: 'Blog Article ' + i,
        body: 'This is text body ' + i,
        createdAt: new Date,
        author: 'Stevo' + i
      });
    }

  });
}