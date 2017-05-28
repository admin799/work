/**
 * Created by dream on 2017/5/24.
 */
app.config(function (alldata,$stateProvider,$urlRouterProvider) {
    alldata.fstdata.forEach(function (i) {
        $stateProvider
            .state(i.route,{
                url:"/"+i.route,
                templateUrl:"page/sidebar.html",
                controller:function ($scope,$stateParams,alldata) {
//                  console.log($stateParams.self.id)
                    var newdata=alldata.secdata.filter(function (i) {
                        return i.parentid==$stateParams.self.id
                    })
                    $scope.data=newdata
                    $scope.parentName=$stateParams.self.name
                    $scope.statueCon=false
                    $scope.statueConFn=function () {
                        $scope.statueCon=!$scope.statueCon
                    }
                },
                params:{
                    self:i
                }
            })
    })
   	alldata.secdata.forEach(function (i) {
        $stateProvider
            .state(i.route,{
                url:"/"+i.route,
                templateUrl:"page/"+i.enName+".html",
                controller:function ($scope,$stateParams,alldata,pre,getpage,$filter) {
                    var cutfn=function () {
                        $scope.data=alldata.fourdata
                        $scope.fileData=function () {
                            return $filter('filter')($scope.data,{role:$scope.roleName,state:$scope.statues})
                        }
                        console.log($scope.fileData())
						// 每一页显示的数据长度
//                      $scope.page=3
						// 定义中间页数显示的长度,只能为奇数；
//                      $scope.middle=5
                        getpage($scope)
                        $scope.pagedata(1)
                        $scope.searchFn=function () {
                            console.log($scope.roleName)
                            console.log($scope.statues)
                            $scope.pagedata(1)
                        }

                    }
                    switch (i.id){
                        case 22:{
                            cutfn()
                        }break;
                        case 23:{
                            $scope.data=alldata.fourdata
                        }break;
                    }

                },
//              controller:i.enName,
                resolve:{
                    pre:function ($q,$http,$stateParams) {
                        // $http.get("/")
//                      console.log($stateParams.id)
                    }
                },
                params:{
                    id:""
                }
            })
    })

})
