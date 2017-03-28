'use strict';

angular.module('adf.widget.githubuser', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('githubuser', {
        title: 'Github Users Repos',
        description: 'Lets look at repos for a particular user',
        controller: function viewCtrl($scope, $http){

          $scope.userRepos = null,
          $scope.searchError = false;

          $scope.findUser = function (inputUserName){
            if($scope.ghUserForm.ghName.$valid){
              $http.get("https://api.github.com/users/" + inputUserName + "/repos").then(
                function success(data){
                  console.log(data);
                  $scope.userRepos = data.data;
                  if(data.data.length === 0){
                    $scope.userRepos = null;
                    $scope.searchError = true;
                  }
                },
                function error(error){
                  //Handle Error
                  $scope.userRepos = null;
                  $scope.searchError = true;
                }
              ).finally(function(){
                console.log("Done either way");
              })
            }else{
              //Handle non valid user inputUserName
              //should not get here right now, form submit is disabled on invalid user
            }

          }
        },
        templateUrl: '{widgetsPath}/githubuser/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/githubuser/src/edit.html'
        }
      });
  });
