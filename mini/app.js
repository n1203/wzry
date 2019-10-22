const config = require('./config/config.js');

App({
  globalData: {
    info:''
  },
  onLaunch: function () {
    this.logIn();
    this.getdata();
  },
  logIn: function () {
    console.log("logInloginlogin");
    return new Promise(function (resolve, reject) {
      wx.login({
        success: (res) => {
          let code = res.code
          console.log(code);
          if (code) {
                wx.setStorageSync('user', res.userInfo)
                wx.request({
                  url: `${config.api}/login`,
                  method: 'POST',
                  data: {
                    code: code
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res.data)
                    wx.setStorageSync('token', res.data.token)
                    if (res.data.openid!=''){
                      wx.setStorageSync('openid', res.data.openid)
                    }
                    resolve(res)
                  }
                })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
            reject(err)
          }
        }
      });
    })
    
  },
  updataUsers:function(e){
    const openid = wx.getStorageSync('openid')
    return new Promise(function (resolve, reject) {
    wx.request({
      url: `${config.api}/users`,
      method: 'POST',
      data: {
        userData: e,
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.setStorageSync('user', res.data.user)
        console.log(res.data)
        resolve(res)
      }
    })
    })
  },
  getdata: function () {
    var that = this;
    wx.request({
      url: `${config.api}`,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.globalData.info = res.data.model[0]
      }
    })
  },
  checkToken: function () {
    console.log('Promise');
    const token = wx.getStorageSync('token')
    return new Promise(function (resolve, reject) {
      wx.request({
        url: `${config.api}/auth`,
        header: {
          'authorization': token
        },
        method: 'POST',
        success(res) {
          console.log(res);
          resolve(res)
        },
        fail(err) {
          console.log(err);
          reject(err)
        }
      })
    })
  }
})
