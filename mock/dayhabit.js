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
    url: '/plan/list',
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
    url: '/plan/edit',
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
  }

  // {
  //   url: '/vue-element-admin/article/detail',
  //   type: 'get',
  //   response: config => {
  //     const { id } = config.query
  //     for (const article of List) {
  //       if (article.id === +id) {
  //         return {
  //           code: 20000,
  //           data: article
  //         }
  //       }
  //     }
  //   }
  // },

  // {
  //   url: '/vue-element-admin/article/pv',
  //   type: 'get',
  //   response: _ => {
  //     return {
  //       code: 20000,
  //       data: {
  //         pvData: [
  //           { key: 'PC', pv: 1024 },
  //           { key: 'mobile', pv: 1024 },
  //           { key: 'ios', pv: 1024 },
  //           { key: 'android', pv: 1024 }
  //         ]
  //       }
  //     }
  //   }
  // },

  // {
  //   url: '/vue-element-admin/article/create',
  //   type: 'post',
  //   response: _ => {
  //     return {
  //       code: 20000,
  //       data: 'success'
  //     }
  //   }
  // },

  // {
  //   url: '/vue-element-admin/article/update',
  //   type: 'post',
  //   response: _ => {
  //     return {
  //       code: 20000,
  //       data: 'success'
  //     }
  //   }
  // }
]
