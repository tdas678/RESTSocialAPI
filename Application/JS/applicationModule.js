//Defining the Module and Dependency Injection ngRoute
var App = angular.module('westApp',['ui.router']);

//config to route the nested  views


    
App.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
    
     .state('Index',{url:'/Index',templateUrl:'/Index',controller : 'LoginController'})
    .state('Index.posting',{url:'/posting',templateUrl:'View/Posting.html',controller : 'postingController'})
     .state('Index.deleteupdate',{url:'/Posting_DU/:param',templateUrl:'View/Posting_DU/:param',controller : 'deleteUpdateController'})
     .state('Index.posttracking',{url:'/tracking/:param',templateUrl:'View/PostTracking/:param',controller : 'TrackingController'})
//     .state('Index.Specific',{url:'/specificPost',templateUrl:'View/SpecificPostComments.html',controller : 'LoginController'})
     .state('Index.Specific',{url:'/specificPost/:param',templateUrl:'View/SpecificPostComments/:param',controller : 'commentsController'})
//    .otherwise({ redirectTo: '/Index' })
$urlRouterProvider.otherwise("/");
    

    
});



window.fbAsyncInit = function() {
    FB.init({
      appId      : '254651964871027',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));






