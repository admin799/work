
app.config(function (alldata,$stateProvider,$urlRouterProvider) {
    alldata.fstdata.forEach(function (i) {
        $stateProvider
            .state(i.route,{
                url:"/"+i.route,
                templateUrl:"page/aside.html",
                controller:function ($scope,$stateParams,alldata) {
//                  console.log($stateParams.self.id)
                    var newdata=alldata.secdata.filter(function (i) {
                        return i.parentid==$stateParams.self.id
                    })
//                  console.log(newdata)
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
                controller:function ($scope,$stateParams,alldata,pre,cutpage,$filter) {
                    var cutfn=function () {
                        $scope.data=alldata.thirdata
                        $scope.fileData=function () {
                            return $filter('filter')($scope.data,{role:$scope.roleName,state:$scope.statues})
                        }
//                      console.log($scope.fileData())
//        每一页显示的数据长度
                        $scope.maxLength=1
//        定义中间页数显示的长度,只能为奇数；
                        $scope.middlePage=5
                        cutpage($scope)
                        $scope.pageShow(1)
                        $scope.searchFn=function () {
                            $scope.pageShow(1)
                        }
                        
                        	
                    } 
	                    $scope.search=function(){
					   		$scope.names=$("#wei").val();
					   		$scope.admin=$("#use").val();
					   		$scope.states=$("#states").val();
					   		$scope.name=$scope.names;
					   		var oldData=$scope.fileData()
					   		var result=$filter('filter')(oldData,$scope.name)
					   		var results=$filter('filter')(result,$scope.admin)
					   		var resulter=$filter('filter')(results,$scope.states)
					   		$scope.data=resulter;
					   		cutpage($scope);
					   	}
						
						//添加
                   	 
                   	$scope.btnAdd=function(){
						var  date=new Date();
						var  year=date.getFullYear();
						var  month=date.getMonth()+1;
						var  day=date.getDate();
						var type=$('input[type="radio"]:checked').val();
						const obj={}
							var len=$scope.data.length+1;
							obj.ID=len++,
							obj.loginname=$(".username").val(),
							obj.name=$('.name').val(),
							obj.role=$(".user").val(),
							obj.telephone=$(".telphone").val(),
							obj.email=$(".email").val(),
							obj.state=type,
							obj.creattime=year+'-'+month+'-'+day;
//							console.log(obj.ID)
						var data=$scope.data;
						data.unshift(obj)
//						console.log(data)
//						console.log(data.length)
						$scope.data=data;
						cutpage($scope)
					
		            
					}
						
						
                        //修改
                       	$scope.bol=false;
						$scope.amend=function(ind){
							var oldData=$scope.fileData()
							$scope.bol=true;
							$scope.tar=oldData[ind-1];
//							console.log($scope.tar)
//							console.log(ind)
							//禁用为1，启用为0
							if($scope.tar.state=="禁用"){
								$('.lab>input').eq(1).attr('checked',true);
							}else{
								$('.lab>input').eq(0).attr('checked',true);
							}
							//循环遍历数组
					        oldData.forEach(function(item,index){
					        	//判断id是否一致
					            if(item.ID==ind){
					                $scope.tar={}
					                for(key in item){
					                    $scope.tar[key]=item[key];
					                }
					                //点击确定的时候返回数据
					                $scope.sure=function(){
					                    $scope.bol=false;
					            		var lanlen = $('.lab').length;
					            		for(var i=0;i<lanlen;i++){
					            			if($('.lab').eq(i).find('input').is(':checked')){
					            				if(i==0){
					            					$scope.tar.state="启用"
//					            					alert(123)
					            				}else{
					            					$scope.tar.state="禁用"
//					            					alert(456)
					            				}
					            			}
					            		}
					                	oldData[ind-1]=$scope.tar;
										$scope.data=oldData;
					        			cutpage($scope);
					                }
					            }
					        })
						}
						$scope.abolist=function(){
							$scope.bol=false;
						}
                       	//删除
                       	$scope.remove=function(del){
			            	var oldData=$scope.fileData()
			                oldData.forEach(function(v,i){
			                    if(v.ID==del){
			                		oldData.splice(i,1);
			                    }
			                })
			                $scope.data=oldData
			                cutpage($scope)
			           	}
                    switch (i.id){
                        case 22:{
                            //角色管理
                            cutfn()
                        }break;
                        case 23:{
                            $scope.data=alldata.thirdata
                        }break;
                    }

                },
                // controller:i.enName,
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
