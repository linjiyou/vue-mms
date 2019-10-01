import router from './router'
import {getUserInfo} from './API/login'
import Vue from "vue"
import store from './store'

//权限效验
const vm=new Vue()
router.beforeEach((to,from,next)=>{
    //  const token=localStorage.getItem('msm-token');
        const token=store.state.user.token
     if(!token){
         if(to.path!=='/login'){
            vm.$message('亲，您还没有登录哦');
             next({path:'./login'})
         }else{
             next()
         }
     }else{
         if(to.path==='/login'){
             next()
         }else{
            // const userInfo=localStorage.getItem('msm-user');
            const userInfo=store.state.user.user
             if(userInfo){
                 next()
             }else{
                 store.dispatch('GetUserInfo').then(response=>{
                     if(response.flag){
                         next()
                     }else{
                         next({path:'/login'})
                     }
                 }).catch(error=>{

                 }) 
                //  getUserInfo(token).then(response=>{
                //      const resp=response.data;
                //      if(resp.flag){
                //          localStorage.setItem('msm-user',JSON.stringify(resp.data));
                //          next()
                //      }else{
                //          next({path:'/login'})
                //      }
                //  })
             }
         }
     }
})