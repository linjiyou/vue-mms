import axios from 'axios';
import {Loading,Message} from 'element-ui'
 const request= axios.create({
     baseURL:process.env.VUE_APP_BASE_API,
     timeout:5000
});

const loading={
    loadingInstance:null,
    open(){
       if(this.loadingInstance===null){
           this.loadingInstance=Loading.service({
               text:'拼命加载中...',
               target:'.section',
               background:'rgba(0,0,0,0.5)'
           })
       }
    },
    close(){
        if(this.loadingInstance!==null){
            this.loadingInstance.close()
        }
        this.loadingInstance=null
    }
}

//请求加载拦截器
request.interceptors.request.use(config=>{
       loading.open()
       return config;
  },error=>{
      loading.close()
       return Promise.reject(error);
  });
// 响应拦截器
request.interceptors.response.use(rel=>{
        const resp=rel.data
        if(resp.code!==200){
           Message({
               message:resp.message||"系统异常",
               type:"warning",
               duration:5*1000
           })
        }
        loading.close()
        return rel;
  },error=>{
       loading.close()
    //    Message({
    //        message:error.message,
    //        type:'error',
    //        duration:5*1000
    //    })
       return Promise.resolve(error)
  })
  export default request 
