const config = require('../../config/config.js');

// client/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    OrderNum: '',
    Express: [],
    SysInfo: []
    
  },
  click: function (e) {
    var id = e.currentTarget.id



    wx.navigateTo({
      url: '../detail/detail',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { id: id })
      }
    })









  },
  toSubmit:function(options){
    wx.navigateTo({
      url: '../submit/submit',
    })
  },
  getSum() {
    let that = this;
    wx.request({
      url: `${config.api}/OrderCount`,
      success: function (res) {
        that.setData({
          OrderNum: res.data
        })
      }
    })
  },
  getSysInfo(){
    let that = this;
    wx.request({
      url: `${config.api}/system`,
      success(res){
        that.setData({
          SysInfo: res.data
        })
      }
    })
  },
  getOrder(){
    var userid = wx.getStorageSync('userid')
    let that = this;
    wx.request({
      url: `${config.api}/userOrders/${userid}`,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          Express: res.data,
          receive: (res.data).length,
        })
      }
    })
    wx.request({
      url: `${config.api}/userOrdersDone/${userid}`,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          account: (res.data).length
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSum();
    this.getSysInfo();
    this.getOrder();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrder();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})