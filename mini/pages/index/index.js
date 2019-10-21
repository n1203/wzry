const app = getApp()

Page({
  data: {
    info:''
  },
  onLoad: function () {
    this.setData({
       info:getApp().globalData.info
    });
    console.log(this.data.info)
  },
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
    goooo: function (a) {
        console.log('a')
        wx.navigateTo({
            url: '/pages/print/print'
        })
    }
     

})