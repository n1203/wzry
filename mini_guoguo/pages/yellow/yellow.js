// pages/yellow/yellow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Express: [],
  },
  getExpress() {
    let that = this;
    wx.request({
      url: 'http://119.29.163.198:30002/JYguoguo/api/postinc',
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          Express: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExpress();
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
    this.getTabBar().setData({
      // 跳转驿站页面
      selected: 1
    });

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