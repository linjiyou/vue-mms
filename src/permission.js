import router from './router'
import {getUserInfo} from './API/login'
import Vue from "vue";

//权限效验
const vm=new Vue()
router.beforeEach((to,from,next)=>{
     const token=localStorage.getItem('msm-token');
     if(!token){
         if(to.path!=='/login'){
            vm.$message('亲，您还没有登录哦');
             next({path:'./login'})
         }else{
             next()
         }
     }else{
         if(to.path==='./login'){
             next()
         }else{
             const userInfo=localStorage.getItem('msm-user');
             if(userInfo){
                 next()
             }else{
                 getUserInfo(token).then(response=>{
                     const resp=response.data;
                     if(resp.flag){
                         localStorage.setItem('msm-user',JSON.stringify(resp.data));
                         next()
                     }else{
                         next({path:'/login'})
                     }
                 })
             }
         }
     }
})