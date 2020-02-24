import request from '@/utils/request'

export function getPlansApi(userId) {
  return request({
    url: '/plan/list',
    methods: 'get',
    params: { userId }
  })
}

export function editPlanApi(planId) {
  return request({
    url: '/plan/edit',
    methods: 'post', // put ??? TODO RESTful
    data: planId
  })
}

export function deletePlansApi(planIds) {
  return request({
    url: '/plan/delete',
    methods: 'post', // delete ??? TODO RESTful
    data: planIds
  })
}

export function insertPlanApi(plan) {
  return request({
    url: '/plan/insert',
    methods: 'post',
    data: plan
  })
}
