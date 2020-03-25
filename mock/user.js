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
  },
  {
    url: '/signup',
    type: 'post',
    response: config => {
      const { name, pass } = config.body
      for (let i = 0; i < userDataArray.length; i++) {
        if (userDataArray[i].name === name) {
          return {
            statusCode: 200,
            result: false,
            data: '账号重复'
          }
        }
      }
      const newUser = {}
      newUser.name = name
      newUser.password = pass
      newUser.touxiang = ''
      userDataArray.push(newUser)
      return {
        statusCode: 200,
        result: true,
        data: '注册成功'
      }
    }
  }
]
