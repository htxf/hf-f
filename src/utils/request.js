import axios from 'axios'

// create an axios instance
const service = axios.create({
  // baseURL: 'htxf/hf/',
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

// response interceptor
service.interceptors.response.use(
  response => {
    // real resopnse data
    const res = response.data
    // TODO
    // statusCode == 0 not logged in
    // statusCode == 1 login timeout
    // statusCode == 2 backend business error
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
