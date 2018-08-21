// the config of app router

import TestManagement from './components/testManagement/TestManagement.vue'
import UserGroup from './components/userGroup/UserGroup.vue'
import Help from './components/help/Help.vue'
import UserList from './components/user/UserList.vue'
import expressData from './components/express/expressData.vue'
import Home from './components/home/Home.vue'
import App from './App.vue'
import login from './login.vue'
export default [
        {
            path:'/',
            name:'login',
            component:login
        },
        {
        path: '/App',
        component: App,
        children: [
            {
                
                path:'home',
                component:Home
            },
            {
                name: '商品',
                path: 'testManagement',
                component: TestManagement
            },
            {
                name:'快递',
                path:'express',
                component:expressData
            },
            {
              name: '订单',
              path: 'help',
              component:Help
            },
             {
              name: '用户列表',
              path: 'user',
              component:UserList
            },
             {
              name: '用户意见',
              path: 'userGroup',
              component:UserGroup
            },
        ]
    },
    {
        path: '*',
        //redirect: '//testManagement'
    }
]
