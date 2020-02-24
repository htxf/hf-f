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
