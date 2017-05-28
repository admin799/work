/**
 * Created by microsoft on 2016/4/11.
 */
    app.constant('alldata',{
            fstdata:[
                {
                    id:1,
                    name:'个人中心',
                    nickname:'账户管理',
                    route:"personalCenter"
                },
                {
                    id:2,
                    name:'系统设置',
                    nickname:'权限管理',
                    route:"system"
                }
            ],
            se:[
            	{
            		id:"ID",
            		login:"登录名",
            		name:"真实姓名",
            		role:"角色",
            		iphone:"手机",
            		email:"邮箱",
            		state:"状态",
            		time:"创建时间",
            		operation:"操作"
            	}
            ],
            secdata:[
                {
                    id:11,
                    parentid:1,
                    name:'个人信息',
                    enName:"selfMsg",
                    route:'personalCenter.selfMsg',
                    routeUrl:'/selfMsg'
                },
                {
                    id:12,
                    parentid:1,
                    name:'修改密码',
                    enName:"amendPS",
                    route:'personalCenter.amendPS',
                    routeUrl:'/amendPS'
                },
                {
                    id:21,
                    parentid:2,
                    name:'功能配置',
                    enName:"seting",
                    route:'system.seting',
                    routeUrl:'/seting'
                },
                {
                    id:22,
                    parentid:2,
                    name:'角色管理',
                    enName:"add",
                    route:'system.add',
                    routeUrl:'/add'
                },
                {
                    id:23,
                    parentid:2,
                    name:'用户管理',
                    enName:"list",
                    route:'system.list',
                    routeUrl:'/list'
                }
            ],
            thirdata:[
                {
                    ID:1,
                    parentid:23,
                    loginname:'zhangsan',
                    name:'张三',
                    role:'管理员',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'启用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:2,
                    parentid:23,
                    loginname:'lisi',
                    name:'李四',
                    role:'管理员',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'禁用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:3,
                    parentid:23,
                    loginname:'wangwu',
                    name:'王五',
                    role:'用户',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'启用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:4,
                    parentid:23,
                    loginname:'zhangchen',
                    name:'张晨',
                    role:'用户',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'启用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:5,
                    parentid:23,
                    loginname:'liucheng',
                    name:'刘成',
                    role:'管理员',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'禁用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:6,
                    parentid:23,
                    loginname:'liji',
                    name:'李继',
                    role:'用户',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'禁用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:7,
                    parentid:23,
                    loginname:'yuantao',
                    name:'袁涛',
                    role:'管理员',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'启用',
                    creattime:'2014-07-27 16:56'
                },
                {
                    ID:8,
                    parentid:23,
                    loginname:'wangjian',
                    name:'王建',
                    role:'用户',
                    telephone:'15098950322',
                    email:'837990335@qq.com',
                    state:'禁用',
                    creattime:'2014-07-27 16:56'
                }
            ],
            fourdata:[
                {
                    ID:1,
                    role:"管理员",
                    state:"启用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:2,
                    role:"管理员2",
                    state:"禁用",
                    orders:2,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:3,
                    role:"管理员",
                    state:"禁用",
                    orders:5,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:4,
                    role:"管理员2",
                    state:"启用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:5,
                    role:"管理员0",
                    state:"启用",
                    orders:2,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:6,
                    role:"管理员1",
                    state:"禁用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:7,
                    role:"管理员是",
                    state:"启用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:8,
                    role:"管理员0",
                    state:"启用",
                    orders:1,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:9,
                    role:"管理员2",
                    state:"启用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:10,
                    role:"管理2",
                    state:"启用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:11,
                    role:"管理2",
                    state:"启用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:12,
                    role:"管理2",
                    state:"启用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:13,
                    role:"管理2",
                    state:"启用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:14,
                    role:"管理2",
                    state:"启用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:15,
                    role:"管理2",
                    state:"启用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:16,
                    role:"管理2",
                    state:"启用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                },
                {
                    ID:17,
                    role:"管理员2",
                    state:"禁用",
                    orders:0,
                    creattime:'2014-07-27 16:35'
                }

            ]
    })


