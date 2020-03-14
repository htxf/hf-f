import request from '@/utils/request'

export function getPlansApi(userId) {
  return request({
    url: '/dayPlans/query',
    method: 'get',
    params: { userId }
  })
}

// method 写成了 methods 导致post未被识别，默认仍是get……
export function editPlanApi(data) {
  return request({
    url: '/dayPlans/edit',
    method: 'post', // put ??? TODO RESTful
    data
  })
}

export function deletePlansApi(data) {
  return request({
    url: '/dayPlans/delete',
    method: 'post', // delete ??? TODO RESTful
    data
  })
}

export function insertPlanApi(data) {
  return request({
    url: '/dayPlans/insert',
    method: 'post',
    data
  })
}
