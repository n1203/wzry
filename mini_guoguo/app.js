const config = require('./config/config.js');
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${config.api}/login`,
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            wx.setStorageSync('token', res.data.token)
            if (res.data.openid != '') {
              wx.setStorageSync('openid', res.data.openid)
              wx.setStorageSync('userid', res.data.id)
            }
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              const userid = wx.getStorageSync('userid');
              const token = wx.getStorageSync('token');
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              wx.request({
                url: `${config.api}/user/userinfo`,
                method: 'PUT',
                data: {
                  data: res.userInfo,
                  userid: userid
                },
                header: {
                  'content-type': 'application/json',
                  authorization: token,
                },
                success: function (res) {
                  console.log(res.data)
                  wx.setStorageSync('userinfo', res.data)
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})