import request from '../utils/request'

export default {
    search(page, size, searchMap) {
        return request({
            url: `/staff/list/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    },
    add(pojo) {
        return request({
            url: '/staff',
            method: 'post',
            data: pojo
        })
    },
    getById(id) {
        return request({
            url: `/staff/${id}`,
            method: 'get'
        })
    },
    update(pojo) {
      return request({
          url:`/staff/${pojo.id}`,
          method:'put',
          data:pojo

      })
    },
    delete(id){
     return request({
         url:`/staff/${id}`,
         method:'delete'
     })
    }
}