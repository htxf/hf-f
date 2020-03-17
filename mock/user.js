const userDataArray = [
  { name: 'xiaofei', password: '111', touxiang: 'xx' },
  { name: 'wc', password: '222', touxiang: 'xx' }
]

export default [
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { name, password } = config.body
      let result = {}
      for (let i = 0; i < userDataArray.length; i++) {
        if (name === userDataArray[i].name && password === userDataArray[i].password) {
          result = userDataArray[i]
          return {
            statusCode: 200,
            result: true,
            data: result
          }
        }
      }
      return {
        statusCode: 200,
        result: false,
        data: '用户名或密码错误'
      }
    }
  }
]
