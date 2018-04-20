// const serverPath = 'http://127.0.0.1:9999/api/'
// const serverPath = 'https://time-mail.nanafly.com/api/'
import serverPath from './config'

let http = {
  post (url, params = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: serverPath + url,    // 拼接完整的url
        data: params,
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
        header: {
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
  }
}

function getPublicLetters (params) {
  return http.get('letter/list', params)
}

function getLetter (params) {
  return http.get('letter/show', params)
}

function sendLetter (data) {
  return http.post('letter/store', data)
}

function loginByWeixin (data) {
  return http.post('auth/loginByWeixin', data)
}

function like (data) {
  return http.post('letter/like/increment', data)
}

function dislike (data) {
  return http.post('letter/like/decrement', data)
}

// 评论
function getComments (params) {
  return http.get('comment/list', params)
}

// 评论
function addComment (data) {
  return http.post('comment/store', data)
}

export default {
  getPublicLetters,
  loginByWeixin,
  sendLetter,
  getLetter,
  like,
  dislike,
  getComments,
  addComment
}
