import request from '@/utils/request'

export function getPlansApi(userId) {
  return request({
    url: '/plan/list',
    method: 'get',
    params: { userId }
  })
}

// method 写成了 methods 导致post未被识别，默认仍是get……
export function editPlanApi(data) {
  return request({
    url: '/plan/edit',
    method: 'post', // put ??? TODO RESTful
    data
  })
}

export function deletePlansApi(planIds) {
  return request({
    url: '/plan/delete',
    method: 'post', // delete ??? TODO RESTful
    data: planIds
  })
}

export function insertPlanApi(plan) {
  return request({
    url: '/plan/insert',
    method: 'post',
    data: plan
  })
}
