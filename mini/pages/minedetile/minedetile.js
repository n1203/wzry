//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    //地址列表
    addressArray: ['西1', '西2'],
    // 地址列表默认项
    addressIndex: 0,
    date: ''
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //地址选择器
  addressBindPickerChange: function (e) {
    this.setData({
      addressIndex: e.detail.value
    })
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
  saveBtnGo(){
    wx.navigateBack({
      delta: 1
    })
  }
})
