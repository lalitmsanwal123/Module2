(function () {
    'use strict';

  var shoppingList1 = ["1", "2", "3", "4"];

  var shoppingList2 = [
{name : "a", price : 3},
{name : "b", price : 4},
{name : "c", price : 6},
{name : "d", price : 7}
];



    angular.module('TooMuchApp', [])
    .filter('reverse',function () {
      return function (input, uppercase) {
        //factory design pattern
        input = input || '';
        var out ='';
        for (var i = 0; i < input.length; i++) {
          out = input.charAt(i)+ out;
        }

        if(uppercase){
            out= out.toUpperCase();
        }
        return out;
      };
    })
    .controller('TooMuchController', TooMuchController)
    //Making dependecy minification safe
    TooMuchController.$inject = ['$scope','reverseFilter'];
    function TooMuchController($scope,reverseFilter) {
        //Set the text box ItemsValue to blank at the begining
        $scope.ItemsValue = "";
        $scope.ReverseValue ="";
        $scope.WatcherValue = "";
        //Property sets the message if eatable items are too much
        $scope.CheckTooMuch = function () {
            $scope.Message = EvaulateEatableItems($scope.ItemsValue);

        };

        $scope.CallCustomFilter = function (){
          $scope.ReverseValue = reverseFilter($scope.ItemsValue, false);
        };

        $scope.CheckWatchers = function () {
          $scope.WatcherValue = $scope.$$watchersCount;
        }

        $scope.shoppingList1 = shoppingList1;
        $scope.shoppingList2 = shoppingList2;

        $scope.AddtoList = function () {
          var newValue = {
            name : $scope.inputValue1,
            price : $scope.inputValue2
          };

          shoppingList2.push(newValue);
        }

    }

    //function checks the is the values are too much to eat
    function EvaulateEatableItems(value) {
        var listofItems = value.split(",");

        // checks if plate has something on it
        if (listofItems == "undefined" || listofItems == null)
            return "your plate is empty";

        //Validates if there is invalid input
        for (var i = 0; i < listofItems.length; i++) {
            if(listofItems[i].trim() == "")
                return "Food is expired, don't eat!";
        }

        //Checkes items count
        if( listofItems.length <= 3)
            return "Enjoy!";
        else
            return "Too much!";
    }

})();
