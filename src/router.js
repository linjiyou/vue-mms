import Vue from "vue";
import Router from "vue-router";
import Login from './views/login';
import Layout from './components/layout';
import Home from './views/home';
import Goods from './views/goods';
import Member from './views/member';
import Staff from './views/staff';
import Supplier from './views/supplier';


Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path:'/',
      name:'Layout',
      component:Layout,
      redirect:'/home',
      children:[
         {
           path:'home',
           component:Home,
           meta:{title:'首页'}
         }
       ]
    },
    {
      path:'/member',
      component:Layout,
      children:[
        {
          path:'/',
          component:Member,
          meta:{title:'会员管理'}
        }
      ]
    },
    {
      path:'/goods',
      component:Layout,
      children:[
        {
          path:'/',
          component:Goods,
          meta:{title:'商品管理'}
        }
      ]
    },
    {
      path:'/supplier',
      component:Layout,
      children:[
        {
          path:'/',
          component:Supplier,
          meta:{title:'供应商管理'}
        }
      ]
    },
    {
      path:'/staff',
      component:Layout,
      children:[
        {
          path:'/',
          component:Staff,
          meta:{title:'员工管理'}
        }
      ]
    }
    
    
 
  ]
});
