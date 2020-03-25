import request from '@/utils/request'

export function loginApi(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function signApi(data) {
  return request({
    url: '/signup',
    method: 'post',
    data
  })
}

