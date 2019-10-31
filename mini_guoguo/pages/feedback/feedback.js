const config = require('../../config/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
        content: '',
  },
  submitSave:function(){
    let that = this
    var userinfo = wx.getStorageSync('userinfo')
    var token = wx.getStorageSync('token')
    var userid = wx.getStorageSync('userid')
    if (userinfo && token && userid && that.data.content) {
      wx.request({
        url: `${config.api}/feedback`,
        method: 'POST',
        data: {
          content: that.data.content,
          parent: userid
        },
        header: {
         'content-type': 'application/json',
          authorization: token,
        },
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请填写内容再提交哦！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      content: e.detail.value
    })
    console.log(this.data)
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo')
    var token = wx.getStorageSync('token')
    var userid = wx.getStorageSync('userid')
 
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
