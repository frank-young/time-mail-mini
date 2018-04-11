const serverPath = 'http://127.0.0.1:9999/api/'

let http = {
  post (url, body = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: serverPath + url,    // 拼接完整的url
        data: body,
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'token': Number(wx.getStorageSync('token'))
        },
        success (res) {
          resolve(res.data)  // 把返回的数据传出去
        },
        fail (ret) {
          reject(ret)   // 把错误信息传出去
        }
      })
    })
  },
  get (url, body = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: serverPath + url,    // 拼接完整的url
        data: body,
        method: 'GET',
        success (res) {
          resolve(res.data)  // 把返回的数据传出去
        },
        fail (ret) {
          reject(ret)   // 把错误信息传出去
        }
      })
    })
  }
}

function getPublicEmailList () {
  return http.get('post/public/list')
}

function postEmail (data) {
  return http.post('post/store', data)
}

function loginByWeixin (data) {
  return http.post('auth/loginByWeixin', data)
}

export default {
  getPublicEmailList,
  loginByWeixin,
  postEmail
}
