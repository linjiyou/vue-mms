import request from '@/utils/request'
//登录
export function login(username,password){
    return request({
       url:'user/login',
       method:'post',
       data:{
           username,
           password
       }
    })
}
//获取用户信息
export function getUserInfo(token){
    return request({
        url:`/user/info/${token}`,
        method:'get'
    })
}
//退出登录
export function logout(token){
    return request({
        url:'/user/logout',
        method:'post',
        data:{
            token
        }
    })
}