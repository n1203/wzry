const config = require('../../config/config');
Page({
  data: {
    file_url: '',
    //地址列表
    addressArray: ['西1', '西2'],
    // 地址列表默认项
    addressIndex: 0,
    // 打印模式列表
    printArray: ['A4黑白单面', 'A4黑白双面'],
    // 打印模式默认项
    printIndex: 0,
    // 底部tabbar avtive项
    active: 1,
    // 打印数目
    printNum: 1,
    // 是否需要配送服务
    sendServer: true,
    // 是否需要装钉
    dingServer: true
  },
  onLoad: function () {
    const value = wx.getStorageSync('userid')
    this.setData({ userid: value })
  },
  upload: function () {
    let that = this
    wx.chooseMessageFile({
      count: 1, // 默认9
      type: 'file',
      success(e) {
        wx.uploadFile({
          url: `${config.api}/upload`,
          filePath: e.tempFiles[0].path,
          name: 'pdf',
          formData:{
            _id: that.data.userid
          },
          success(res) {
            const data = JSON.parse(res.data)
            that.setData({
              file_url: data.url,
              filename: data.filename,
              mimetype: data.mimetype,
              encoding: data.encoding,
            })
          }
        })
      }
    })
  },
  //地址选择器
  addressBindPickerChange: function (e) {
    this.setData({
      addressIndex: e.detail.value
    })
  },
  //打印模式选择器
  printBindPickerChange: function (e) {
    this.setData({
      printIndex: e.detail.value
    })
  },
  // 打印页数设置
  printNumChange: function (e) {
    this.setData({
      printNum: e.detail
    });
  },
  // 配送服务
  sendChange: function (e) {
    this.setData({
      sendServer: e.detail.value
    });
  },
  // 装钉服务
  dingChange: function (e) {
    this.setData({
      dingServer: e.detail.value
    });
  },
  //返回首页
  backindex: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  orderCount: function () {
  }
})