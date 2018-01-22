App.controller('CustomerController', [
  '$scope',"$http",
  function ($scope, $http) {

      $scope.sortType     = 'name'; // set the default sort type
      $scope.sortReverse  = false;  // set the default sort order
      $scope.all_usb= null;
      $scope.filtered_usb= null;
      $http.get("./app/db/usb.json")
          .then(function(response) {
              $scope.all_usb = response.data;
              $scope.filtered_usb = response.data;
          });
      $scope.filterOptions = {
          HDMI:false,
          VGA:false,
          DVI:false,
          DP:false,
          DPM:false,
          USB3:false
      };
      $scope.filtered = {};

      $scope.order = function(){
          $scope.sortReverse = !$scope.sortReverse;
      };

      $scope.countOptions = function(type){
          var count = 0;
          angular.forEach($scope.all_usb, function(value, key) {
              if(value[type]){
                  count++;
              }
          });
          return count;
      };

      $scope.customFilter = function(type){
          if($scope.filterOptions[type]){
              $scope.filtered[type] = 1;
              $scope.$apply();
          }
          else
              delete $scope.filtered[type];
      }
  }
]);

App.directive('iCheck', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
        require: 'ngModel',
        scope: { someCtrlFn: '&callbackFn' },
        link: function (scope, element, $attrs, ngModel) {
            return $timeout(function () {
                var value = $attrs.value;
                var $element = $(element);

                // Instantiate the iCheck control.
                $element.iCheck({
                    checkboxClass: 'icheckbox_flat-blue',
                    radioClass: 'iradio_flat-blue',
                    increaseArea: '20%'
                });
                $element.on('ifChecked', function(event) {
                    console.log("checked");
                    ngModel.$setViewValue(true);
                });

                $element.on('ifUnchecked', function(event) {
                    // console.log("unchecked");
                    ngModel.$setViewValue(false);
                });

                // If the model changes, update the iCheck control.
                scope.$watch($attrs.ngModel, function (newValue) {
                    // console.log("newValue",newValue);
                    $element.iCheck('update');
                });

                // If the iCheck control changes, update the model.
                $element.on('ifChanged', function (event) {
                    if ($element.attr('type') === 'checkbox' && $attrs.ngModel) {
                        scope.$apply(function () {
                            ngModel.$setViewValue(value);
                            scope.someCtrlFn({arg1: value});
                        });
                    }
                });

            });
        }
    };
}]);

