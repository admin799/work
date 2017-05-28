app.directive('headers',function(){
	return {
		restirict:"ECMA",
		replace:true,
		templateUrl:"page/head.html",
		controller:function($scope,alldata){
			$scope.data=alldata.fstdata
		}
	}
})
app.directive("confirm",function () {
    return {
        restrict:"ECMA",
        replace:true,
        templateUrl:"page/del/dele.html",
        controller:function ($scope,alldata) {

        }
    }
})