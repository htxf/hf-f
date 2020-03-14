import Mock from 'mockjs'

const dayPlans = [
  { timeZone: '上午',
    plans: [
      { planId: '1', finishFlag: false, content: '阅读', startTime: '07:08', stopTime: '08:08' },
      { planId: '2', finishFlag: false, content: '阅读', startTime: '07:08', stopTime: '08:08' },
      { planId: '3', finishFlag: false, content: '阅读', startTime: '07:08', stopTime: '08:08' }
    ]
  },
  { timeZone: '下午',
    plans: [
      { planId: '4', finishFlag: false, content: '锻炼', startTime: '09:00', stopTime: '09:30' },
      { planId: '5', finishFlag: false, content: '锻炼', startTime: '09:00', stopTime: '09:30' }
    ]
  },
  { timeZone: '晚上',
    plans: [
      { planId: '6', finishFlag: false, content: '日语', startTime: '19:00', stopTime: '20:00' },
      { planId: '7', finishFlag: false, content: '日语', startTime: '19:00', stopTime: '20:00' },
      { planId: '8', finishFlag: false, content: '日语', startTime: '19:00', stopTime: '20:00' }
    ]
  }
]
export default [
  {
    url: '/dayPlans/query',
    type: 'get',
    response: config => {
      // const { importance, type, title, page = 1, limit = 20, sort } = config.query
      return {
        statusCode: 200,
        data: dayPlans
      }
    }
  },
  {
    url: '/dayPlans/edit',
    type: 'post',
    response: config => {
      // 在mock-server.js启用时如何调试？ console、alert、debugger等都不起作用
      // mock-server 其实是运行在webpack-dev-server ？本质上算是Node的服务器？Node的JS环境
      // 与浏览器的JS环境不同，没有window、alert、debugger之类的。但是又console方法？
      // 有一些其他打印信息，可在mock-server.js中修改？
      // 需要调试的话，应该找在webpack-dev-server下如何调试？
      console.log(config)
      const { planId, finishFlag, content, startTime, stopTime } = config.body
      for (let i = 0; i < dayPlans.length; i++) {
        for (let j = 0; j < dayPlans[i].plans.length; j++) {
          if (dayPlans[i].plans[j].planId === planId) {
            dayPlans[i].plans[j].finishFlag = finishFlag
            dayPlans[i].plans[j].content = content
            dayPlans[i].plans[j].startTime = startTime
            dayPlans[i].plans[j].stopTime = stopTime
          }
        }
      }
      return {
        statusCode: 200,
        data: 'success'
      }
    }
  },
  {
    url: '/dayPlans/insert',
    type: 'post',
    response: config => {
      const { finishFlag, content, startTime, stopTime } = config.body
      // mock一个随机数orId值
      const newPlanId = Mock.mock('@id')
      const newData = {}
      // 后台给planId发号 or 随机数？
      newData.planId = newPlanId
      newData.finishFlag = finishFlag
      newData.content = content
      newData.startTime = startTime
      newData.stopTime = stopTime
      // 后端其实就直接插入数据库了……
      return {
        statusCode: 200,
        data: newPlanId
      }
    }
  },
  {
    url: '/dayPlans/delete',
    type: 'post',
    response: config => {
      const { planIds } = config.body
      const planIdArray = planIds.split(',')
      console.log(planIdArray)
      // 后端其实就直接deleteById删数据库
      return {
        statusCode: 200,
        data: 'success'
      }
    }
  }
]
