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
