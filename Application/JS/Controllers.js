
//Controllers


//Controller for Auth2.0 Google Authentication and Authorization Code
App.controller("LoginController",function($rootScope,$scope,$http,$location,$state){
    $scope.login=function(){
        
             auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then(signInCallback); 
         };
         
    
         
         function signInCallback(authResult){
             console.log(authResult.code);
             if(authResult.code!=null)
             
             var userInfo;
             
             
             {
                var req={method:'POST',url:'/api/authenticate',headers:{'Content-Type':'application/json'},data:{'authcode':authResult.code}}
        
      
               $http(req).then(function successCallback(response){
              console.log(response.data);
              
              $rootScope.id=response.data._id;
              $rootScope.name=response.data.name;
              $rootScope.email=response.data.email;
              $rootScope.image=response.data.picture;
              console.log($rootScope.id);
               $scope.FBA="true";
         
          $state.go('Index.posting');
          $scope.HIDE="true";
          
             
             });
             
         }
         }
     
                //FACEBOOK OAuth  Login for Post
      $scope.facebookLogin=function(){
     
      var email=$scope.email;
      var post=$scope.message;
      var client_id="254651964871027";
      var client_secret="15f54123744aa7d3b4228a94de819a88";
      FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
       console.log(response);
       var access_token=FB.getAuthResponse();
      
       console.log(access_token);
       var token=access_token.accessToken;
       $rootScope.facebookAccessToken=token;
       console.log(token);
       console.log(post);
       $scope.fblogedin="true";
       

       //Request to server for POST to Facebook Logged in account
       
          {
                var req={method:'POST',url:'/api/fbpost',headers:{'Content-Type':'application/json'},data:{'access_token':token,'post':post,'email':email}}
        
      
               $http(req).then(function successCallback(response){
              console.log(response.data);
              
 
             
             });
           //  $state.go('Index.posttracking',{param:$scope.email}); 
         }
       
       
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
}, {scope: 'email,user_likes,publish_actions',
    return_scopes: true
    
});
   
  
     }
     
     
     //Twitter OAuth  Login( 3 Legged Authentication)
     
     $scope.twitterLogin=function(){
      
      var email=$scope.email;
      var post=$scope.message;
     
      
            var req={method:'GET',url:'/api/twitterLogin',headers:{'Content-Type':'application/json'}}
        
      
               $http(req).then(function successCallback(response){
            
            
              console.log(response.data);
              
                var requestToken=response.data.requestToken;
               var requestTokenSecret=response.data.requestTokenSecret;
           //   var myWindow = window.open(response.data,"","resizable=yes,width=600,height=400,toolbar=no,titlebar=no,menubar=no,scrollbars=yes");
                 
              
           var url = "https://api.twitter.com/oauth/authenticate?oauth_token="+requestToken+"&oauth_token_secret="+requestTokenSecret+"&oauth_callback_confirmed=true";
             var myWindow = window.open(url,"","resizable=yes,width=600,height=400,toolbar=no,titlebar=no,menubar=no,scrollbars=yes");
             var timer = setInterval(checkWindow, 1000); 

function checkWindow() {

 try {
     var twitter_url = myWindow.location.href; 
     console.log(twitter_url);

     if (twitter_url.indexOf('oauth_verifier') != -1){

         var verifier = "";

         var token = "";

         myWindow.close();

         twitter_url = twitter_url.substring(twitter_url.indexOf('?')+1);

         var urPartes = twitter_url.split('&');

         for (i = 0; i < urPartes.length; i++){

            if (urPartes[i].indexOf('oauth_verifier') != -1){
              var  verifier = urPartes[i].split('=')[1];
            }

            if (urPartes[i].indexOf('oauth_token') != -1){
                  var  token = urPartes[i].split('=')[1];
            }
         }

         var oauth_verifier = verifier.substr(0,verifier.length-2);

          var oauth_token = token;

         console.log(oauth_verifier);
         console.log(oauth_token);
        $scope.twitterLoggedIn="true";
          // REST call to Server for post
         {
              var req={method:'POST',url:'/api/twitterPost',headers:{'Content-Type':'application/json'},
              data:{'requestToken':oauth_token,'requestTokenSecret':requestTokenSecret,'oauth_verifier':oauth_verifier,'email':$scope.email,'post':post}}
        
      
               $http(req).then(function successCallback(response){
            
            
              console.log(response.data);
              console.log(response.data.accessToken);
              console.log(response.data.accessTokenSecret);
              $rootScope.twitteraccessToken=response.data.accessToken;
              $rootScope.twittersecretToken=response.data.accessTokenSecret;
               });
         }
       

 }} catch (e){


 } 
      
               }});
      
     
      
     }
     
     // Linked In Oauth 2 Login ---getting access code 
     
     $scope.linkedinLogin=function(){
         
         console.log("in Linked in");
         var message=$scope.message;
         var client_id="77n73bv3dbpycx";
         var email=$scope.email;
         var redirect_uri="https://tdas4-ece9065-finalproject-tdas4.c9users.io";
         var url="https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id="+client_id+
         "&redirect_uri="+redirect_uri+"&state=STATE&scope=r_basicprofile,w_share,rw_company_admin";
         
         var linkedInWindow = window.open(url,"","resizable=yes,width=600,height=400,toolbar=no,titlebar=no,menubar=no,scrollbars=yes");
             var timer = setInterval(checkWindow2, 1000); 

function checkWindow2() {

 try {
     var linkedin_url = linkedInWindow.location.href; 
     console.log(linkedin_url);

            linkedInWindow.close();
            
            var urlArray = linkedin_url.split( '=' );
            console.log(urlArray[1]);
            var linkedinCode=urlArray[1].split('&');
            console.log(linkedinCode[0]);
            var linkedinCODE=linkedinCode[0];
            //Linken In Oauth 2 Login getting Access Token from server
            
            {
              var req={method:'GET',url:'/api/linkedinLogin/'+linkedinCODE};
        
      
               $http(req).then(function successCallback(response){
            
            
              console.log(response.data);
              $rootScope.linkedInaccesstoken=response.data;
              $scope.linkedinLoggedIn="true";
              
              //Posting to Linked IN
              
                 {
                var req={method:'POST',url:'/api/linkedinPost',headers:{'Content-Type':'application/json'},data:{'access_code':$rootScope.linkedInaccesstoken,'message':message,'email':email}}
        
      
               $http(req).then(function successCallback(response){
              console.log(response.data);
             
               });
         }
         
               });
            }
            
            

         
     }catch(e){
         console.log(e);
     }
}

}




     
     $scope.logout=function(){
         window.location.href = "https://tdas4-ece9065-finalproject-tdas4.c9users.io";
         
     }

});

App.controller("postingController",function($scope,$http,$rootScope,$state,$stateParams) {
  
     try{
         
       
    $scope.postCapture=function(){
        
         var data=$scope.message;
         console.log($scope.message);
         console.log($scope.email);
       
       if($scope.facebook){
           
           alert("chk");
           
       }
        
            {
            
            var req={method:'POST',url:'/api/storepost',headers:{'Content-Type':'application/json'},data:{'data':data,'email':$scope.email}}
        
      
               $http(req).then(function successCallback(response){
            
            
              console.log(response.data);
               });
          //     $state.go('Index.posttracking',{param:$scope.email}); 
              
          
        
    }}
}catch(error){
    console.log(error);
}


});



//Controller for Tracking the previous post

App.controller('TrackingController',function($scope,$rootScope,$http,$state,$stateParams)
{
    
     {
            $stateParams.email=$scope.email;
            console.log($stateParams.email);
            var param=$stateParams.email;
            var facebookAccessToken=$scope.facebookAccessToken
            console.log(facebookAccessToken); 
           var req={method:'GET',url:'/api/tracking/'+param}
            $http(req).then(function successCallback(response){
              console.log(response.data);
              $scope.posts=response.data;   
              
              
              });  
            
              
         $scope.postD=function(a){
                 
                  $scope.postid=a._id;
                  console.log($scope.postid);
                 
                 $state.go("Index.deleteupdate",{param:$scope.postid});
              }
              
              $scope.comment=function(comments){
                  
                  $scope.postid=comments._id;
                  console.log($scope.postid);
                  var linkedinAccessToken= $rootScope.linkedInaccesstoken;
                  var twitteraccessToken=$rootScope.twitteraccessToken;
                  var twitteraccessSecret=$rootScope.twittersecretToken;
                  console.log("Checking Token");
                  console.log(twitteraccessToken);
                  console.log(twitteraccessSecret);
                  var req={method:'POST',url:'/api/getComment/'+$scope.postid,headers:{'Content-Type':'application/json'},
                  data:{'facebookAccessToken':facebookAccessToken,'linkedinAccessToken':linkedinAccessToken,'twitteraccessToken':twitteraccessToken,'twitteraccessSecret':twitteraccessSecret}}
        
      
               $http(req).then(function successCallback(response){
              console.log(response.data);
             
               });
              //   $state.go("Index.Specific",{param:$scope.postid});
                 
              }
          //See the comments
          
           $scope.seeComment=function(comments){
                  
                  $scope.postid=comments._id;
                  console.log($scope.postid);
                 $state.go("Index.Specific",{param:$scope.postid});
                 
              }
              
    
     }
     
     
});

// Controller for Delete and Update of Post

App.controller('deleteUpdateController',function($scope,$rootScope,$http,$state,$stateParams){
    
    
    try {
    $scope.show=$stateParams.param;  //param value to delete or update
    console.log($scope.show);
    var post_id=$scope.show;
    console.log(post_id);
    
         var req={method:'GET',url:'/api/showpostonly/'+post_id}
        
      
               $http(req).then(function successCallback(response){
              console.log(response.data);
             
              $scope.message=response.data.text;
              $scope.id=response.data._id;
              console.log($scope.id);
              console.log($scope.message);
              
              //Delete Post
              
              
              $scope.deletePost=function(){
               var req={method:'DELETE',url:'/api/delpost/'+$scope.id}
        
      
               $http(req).then(function successCallback(response){
              console.log(response.data);
               $state.go("Index.posttracking");
              
                 
              });   }
              
              //Update Post
               
               $scope.updatePost=function(){
                   
              $scope.message
              $scope.id=response.data._id;
              console.log($scope.id);
              console.log($scope.message);
              $http.put('/api/updatepost/' +$scope.id, 
              {data:$scope.message}
              )
       .success(function(data) {

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
             $state.go("Index.posttracking");
              
              
                  
                
               }
              
               
                 
              });
        
    }catch(err){
        console.log(err);
    }
});

// Controller to Obtain the coressponding Comments from the post

App.controller('commentsController',function($scope,$rootScope,$http,$state,$stateParams)
{
    try{
        
        $rootScope.id=$stateParams.param;
          // console.log($scope.facebookAccessToken);
    
     var req={method:'GET',url:'/api/showpost/'+$rootScope.id}
        
      
               $http(req).then(function successCallback(response){
              console.log(response.data);
             
              $scope.message=response.data.text;
             
              $scope.commentPost=response.data.comments;
                  console.log($scope.commentPost); 
                   
             
              
              $scope.id=response.data._id;
              console.log($scope.id);
              console.log($scope.message); 
              
     /*           $scope.AddComment=function(comment){
                
                console.log($scope.newcomment);
                console.log($scope.id);
                
             var req={method:'POST',url:'/api/storecomment/'+$scope.id,headers:{'Content-Type':'application/json'},data:{'comment':$scope.newcomment}}
        
      
               $http(req).then(function successCallback(response){
              console.log(response);
              console.log($scope.id);   
              	
           
             
             var req={method:'GET',url:'/api/showpost/'+$rootScope.id}
        
      
               $http(req).then(function successCallback(response){
              console.log(response.data);
             
              $scope.message=response.data.text;
             
              $scope.commentPost=response.data.comments;
                  console.log($scope.commentPost); });
                   
            
            });
               
                   
         
                 
            }  */
              
               });
               
              
           
    }catch(err){
        
        console.log(err);
    }
    
});