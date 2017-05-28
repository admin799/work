/*app.directive("headers",function () {
    return {
        restrict:"ECMA",
        replace:true,
        templateUrl:"page/head.html",
        controller:function ($scope,alldata) {
            $scope.data=alldata.fstdata
        }
    }
})*/
app.config(function($stateProvider){
	$stateProvider
		.state('add',{
			url:"/add",
			templateUrl:"page/add.html",
		})
		.state('list',{
			url:"/list",
			templateUrl:"page/list.html"
		})
})

app.service('getpage',function(){
	return function($scope){
		//添加下面的页数数组
		$scope.arr=[];
		var datas=$scope.filtData();
		$scope.len=Math.ceil(datas.length/$scope.page);
		for(var i=2;i<$scope.len;i++){
			$scope.arr.push(i)
		}
		$scope.showpage=true;
		if($scope.len<=1){
			$scope.showpage=false;
		}
		$scope.pagelen=($scope.middle-1)/2;
		//在下面调用这个函数
		$scope.pagedata=function(ind){
			//传递index给span添加背景颜色
			$scope.index=ind-1;
			$scope.showup=false;
			$scope.showdown=false;
			if($scope.index<$scope.middle-$scope.pagelen){
				$scope.showup=false;
				$scope.showdown=true;
				$scope.showArr=[];
				for(var i=1;i<=$scope.middle;i++){
					$scope.showArr.push(i)
				}
			}else if($scope.index>=$scope.middle-$scope.pagelen && $scope.index<=$scope.len-($scope.middle-1)/2-2){
				$scope.showup=true;
				$scope.showdown=true;
				if($scope.index==$scope.middle-$scope.pagelen){
					$scope.showup=false;		
				}
				if($scope.index==$scope.len-($scope.middle-1)/2-2){
					$scope.showdown=false;
				}
				$scope.showArr=[$scope.index+1]
				for(var i=0;i<$scope.pagelen;i++){
					$scope.showArr.push($scope.index-i)
				}
				for(var i=2;i<=$scope.pagelen+1;i++){
					$scope.showArr.push($scope.index+i)
				}
			}else{
				$scope.showup=true;
				$scope.showdown=false;
				$scope.showArr=[]
				for(var i=0;i<$scope.middle;i++){
					$scope.showArr.push($scope.len-i)
				}
			}
			if(datas.length<=$scope.middle+1){
                $scope.showup=false;
                $scope.showdown=false;
            }
			$scope.cutFun();
		}
		//当span点击的时候传递参数判断
		$scope.changeFun=function(ind){
			$scope.pagedata(ind);
		}
		//点击上一页和下一页的时候
		$scope.updown=function(add){
			if(add=='+'){
				//当点击的索引小于数据的长度时
				if($scope.index+1<$scope.len){
					$scope.pagedata($scope.index+2);
				}
			}else{
				//当点击的索引大于0时
				if($scope.index>0){
					$scope.pagedata($scope.index);
				}
			}
		}
		$scope.changeInput=function(){
			$scope.lenVal=$('.page').val();
			if($scope.lenVal<$scope.len){
				$scope.pagedata($scope.lenVal)
			}
		}
		
		$scope.cutFun=function(){
			var newdata=$scope.filtData();
			$scope.cutData=newdata.splice($scope.index*$scope.page,$scope.page);
//			console.log(newdata);
		}
		$scope.cutFun()
		$scope.pagedata(1);
	}
})

app.controller("ft",function($scope,alldata,getpage,$filter,$stateParams){
	$scope.allse=alldata.se;
	$scope.fstdata=alldata.fstdata;
	$scope.datas=alldata.thirdata;
	$scope.sureadd={};
//	$scope.filt='';
	//删除
   	$scope.del=function(dele){
        $scope.datas=alldata.thirdata;
        $scope.popupSH=true
        //确定的执行方法
        $scope.okFn=function () {
            //通过过滤后的数据找当前显示页
            var indexPage;
            $scope.datas.forEach(function (i,val) {
                switch (i.ID){
                    case dele.ID:{
                        indexPage= Math.ceil(val/$scope.maxLength)
                    }
                }
            })
	   		$scope.datas.forEach(function(val,key){
	   			if(val.ID==dele){
	   				$scope.datas.splice(key,1)
	   			}
			})
            $scope.pagedata(indexPage)
            $scope.popupSH=false
			getpage($scope);
		}
        //取消的执行方法
	    $scope.noFn=function () {
	        $scope.popupSH=false
	    }

   	}
	//编辑
	$scope.show=false;
	$scope.revamp=function(ind){
		var datas=$scope.filtData();
		$scope.show=true;
		$scope.amend=datas[ind-1];
		//禁用为1，启用为0
		if($scope.amend.state=="禁用"){
			$('.lab>input').eq(1).attr('checked',true);
		}else{
			$('.lab>input').eq(0).attr('checked',true);
		}
		//循环遍历数组
        datas.forEach(function(item,index){
        	//判断id是否一致
            if(item.ID==ind){
                $scope.amend={}
                for(key in item){
                    $scope.amend[key]=item[key];
                }
                //点击确定的时候返回数据
                $scope.sure=function(){
                    $scope.show=false;
            		var lanlen = $('.lab').length;
            		for(var i=0;i<lanlen;i++){
            			if($('.lab').eq(i).find('input').is(':checked')){
            				if(i==0){
            					$scope.amend.state="启用"
            				}else{
            					$scope.amend.state="禁用"
            				}
            			}
            		}
                	datas[ind-1]=$scope.amend;
					alldata.thirdata=datas;
        			getpage($scope);
                }
            }
        })
	}
	$scope.cancle=function(){
		$scope.show=false;
	}
	//添加
	$scope.addsure=function(){
		var num=$scope.datas.length+1;
		$scope.sureadd.ID=num++;
		var date=new Date();
		var y=date.getFullYear();
		var m=date.getMonth()+1;
		var r=date.getDate();
		var h=date.getHours();
		var min=date.getMinutes();
		$scope.sureadd.creattime=y+'-'+m+'-'+r+' '+h+':'+min;
		$scope.$emit("sure-add",{
			newdata: $scope.sureadd
		})
		var lanlen = $('.lab').length;
		for(var i=0;i<lanlen;i++){
			if($('.lab').eq(i).find('input').is(':checked')){
				if(i==0){
					$scope.sureadd.state="启用"
				}else{
					$scope.sureadd.state="禁用"
				}
			}
		}
	}
    //监听添加事件
	$scope.$on("sure-add",function(e,d){
		$scope.datas.push(d.newdata)
		alldata.thirdata=$scope.datas;
		getpage($scope);
	})
   	//搜索所有
   	$scope.search=function(){
   		$scope.names=$(".sear").val();
   		$scope.admin=$("#admin").val();
   		$scope.states=$("#states").val();
   		$scope.name=$scope.names;
   		var result=$filter('filter')($scope.datas,$scope.name)
   		var results=$filter('filter')(result,$scope.admin)
   		var resulter=$filter('filter')(results,$scope.states)
   		alldata.thirdata=resulter;
   		getpage($scope);
   	}
	$scope.filtData=function(){
		return alldata.thirdata.map(function(i){
			return i
		})
	}
	$scope.middle=3;
	$scope.page=1;		//每页显示的个数
	getpage($scope);	//service服务的函数传参
})
$('.uil').on('click','li',function(){
	$(this).addClass('bg-span').siblings().removeClass('bg-span')
//	$('.user>span').text($(this).text())
})