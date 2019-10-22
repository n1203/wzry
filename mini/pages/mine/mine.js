//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    beforeLogin: '登录',
    test: false
  },

  onLoad: function () {
    const value = wx.getStorageSync('user')
    this.setData({ userInfo: value })
  },

  //检测onlunch时是否成功取得用户信息
  onShow: function () {
    try {
      var userInfo = wx.getStorageSync('user')
      if (userInfo) {
        this.setData({
          test: true,
        })
      }
    } catch (e) {
      console.log(e);
    }
  },
  onGotUserInfo:function(e){
    var userinfo = JSON.parse(e.detail.rawData)
    wx.setStorageSync('userinfo', userinfo)
    if (e) {
      getApp().updataUsers(e).then((res)=>{
        this.setData({
          test: true,
          userInfo: wx.getStorageSync('user'),
        })
      })
    }
  },
  getUserInfo: function () {
    console.log('userinfo')
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序获取用户数据，
              // 必须是在用户已经授权的情况下调用
              wx.getUserInfo({
                success: function (res) {
                  var userInfo = res.userInfo
                  console.log(userInfo)
                }
              })
            }
          })
        }
      }
    })
  },
  login: function () {
    let that = this
    console.log('login~~~');
    //检测登录态
    getApp().checkToken().then(
      function (res) {
        console.log(res);
        if (parseInt(res.statusCode) === 200) {
          console.log(res)
          console.log('未过期');
          //token 未过期，并且在本生命周期一直有效
        } else {
          console.log(res.data.error);
          //登录态过期
          console.log('过期了！');
          that.reGetUserInfo()
        }
      }
    ).catch(
      function (err) {
        console.log(err);
        wx.showToast({
          title: '服务器未响应',
          icon: 'loading',
          duration: 2000
        })
      }
    )
  },

  //检测使用用户信息的授权，若无权，请求权限
  reGetUserInfo: function () {
    console.log('reGetUserInfo~~~');
    let that = this

    wx.getSetting({
      success: (res) => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          console.log("we already got authorization to use userInfo!");
          that.reLogin()
        } else {
          wx.openSetting({
            success: (res) => {
              let balbal = that
              console.log(that.data.test);
              console.log("授权结果..")
              console.log(res)
              res.authSetting = {
                "scope.userInfo": true,
              }
              that.reLogin()
            }
          })
        }
      }
    })
  },
  getuser: function () {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序获取用户数据，
              // 必须是在用户已经授权的情况下调用
              wx.getUserInfo({
                success: function (res) {
                  var userInfo = res.userInfo
                  console.log(userInfo)
                }
              })
            }
          })
        }
      }
    })
  },
  //登录：获取token
  reLogin: function () {
    getApp().logIn()
      .then(
        (res) => {
          console.log("NEW PROMISE!!!")
          this.setData({
            test: true,
            userInfo: wx.getStorageSync('user'),
          })
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      )
  },

  //退出登录
  quit: function () {
    try {
      wx.removeStorageSync('token')
      wx.removeStorageSync('user')
      this.setData({
        userInfo: {},
        test: false,
      })
    } catch (e) {
      console.log(e);
    }
  },
})
