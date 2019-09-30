import request from '@/utils/request';

const BASE_URL=process.env.VUE_APP_BASE_API;
// request({
//     method:'get',
//     url:'/db.json'
// }).then(response=>{
//     console.log(response.data)
// })
     
export default  {
     getList(){
       const rel= request({
             method:'get',
             url:'/db.json'
         })
         return rel
     }
}