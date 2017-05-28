app.directive("headers",function () {
    return {
        restrict:"ECMA",
        replace:true,
        templateUrl:"page/head.html",
        controller:function ($scope,alldata) {
            $scope.data=alldata.fstdata
        }
    }
})
app.directive("confirm",function () {
    return {
        restrict:"ECMA",
        replace:true,
        templateUrl:"page/directive/confirm.html",
        controller:function ($scope,alldata) {

        }
    }
})
app.directive("amendPopup",function () {
    return {
        restrict:"ECMA",
        replace:true,
        templateUrl:"page/directive/confirmRoleMsg.html",
        controller:function ($scope,alldata) {

        }
    }
})
app.service("cutpage",function () {
    return function ($scope) {
        $scope.pageShow=function (i) {
            var oldData=$scope.fileData();
            $scope.allPage=Math.ceil(oldData.length/$scope.maxLength)
            $scope.pageArr=[]
            for(var j=2;j<$scope.allPage;j++){
                $scope.pageArr.push(j)
            }
            $scope.len=($scope.middlePage-1)/2

            $scope.index=i-1
            $scope.showStatue1=false;
            $scope.showStatue2=false;
            if($scope.index<$scope.middlePage-$scope.len){
                $scope.showStatue1=false;
                $scope.showStatue2=true;
                $scope.showArr=[]
                for(var i=1;i<=$scope.middlePage;i++){
                    $scope.showArr.push(i)
                }

            }else if($scope.index>=$scope.middlePage-$scope.len&&$scope.index<=$scope.allPage-($scope.middlePage-1)/2-2){
                $scope.showStatue1=true;
                $scope.showStatue2=true;
                if($scope.index==$scope.middlePage-$scope.len){
                    $scope.showStatue1=false;
                }
                if($scope.index==$scope.allPage-($scope.middlePage-1)/2-2){
                    $scope.showStatue2=false;
                }

                $scope.showArr=[$scope.index+1]
                for(var i=0;i<$scope.len;i++){
                    $scope.showArr.push($scope.index-i)
                }
                for(var i=2;i<=$scope.len+1;i++){
                    $scope.showArr.push($scope.index+i)
                }
            }else{
                $scope.showStatue1=true;
                $scope.showStatue2=false;
                $scope.showArr=[]
                for(var i=1;i<$scope.middlePage;i++){
                    $scope.showArr.push($scope.allPage-i)
                }
            }
            $scope.cutPageState=true
            $scope.lastPage=true
            if($scope.allPage<=6 && $scope.allPage<=$scope.middlePage+1){
                $scope.showStatue1=false;
                $scope.showStatue2=false;
                if($scope.allPage<2){
                    $scope.lastPage=false
                    if($scope.allPage<1){
                        $scope.cutPageState=false
                    }
                }
            }
            $scope.cutDataFn()
        }

        $scope.cutDataFn=function () {
            var newdata=$scope.fileData()
            $scope.cutoutData=newdata.splice($scope.index*$scope.maxLength,$scope.maxLength)
//          console.log($scope.cutoutData)
        }
        $scope.changeIndexFn=function (i) {
            $scope.pageShow(i)

        }
        $scope.updownFn=function (i) {
            if(i=="+"){
                if(($scope.index+1)< $scope.allPage){
                    $scope.pageShow($scope.index+2)
                }
            }else{
                if($scope.index>0){
                    $scope.pageShow($scope.index)
                }
            }
        }
        $scope.changeInput=function () {
            $scope.pageShow($scope.valueDATA)

        }
        $scope.pageShow(1)
    }
})
app.controller('ft',function($scope,alldata){
	$scope.tar={}
	$scope.fileData=function(){
		return alldata.thirdata.map(function(i){
			return i
		})
	}
})