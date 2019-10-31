const config = require('../../config/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
        phone: '手机号',
        learncode: '学号',
        weixin: '微信号',
        qq: 'QQ号',
        address: '宿舍',
        birthday: '生日',
        grade: '入学年份',
        tie: '院系',
        class: '班级',
        signature: '这家伙真懒，还不填一些个性签名给景院小伙伴看呐！',
  },
  submitSave:function(){
    let that = this
    var userinfo = wx.getStorageSync('userinfo')
    var token = wx.getStorageSync('token')
    var userid = wx.getStorageSync('userid')
    if (userinfo && token && userid) {
        wx.request({
          url: `${config.api}/user/userinfo`,
          method: 'PUT',
          data: {
            data: that.data,
            userid: userid
          },
          header: {
            'content-type': 'application/json',
            authorization: token,
          },
          success: function (res) {
            console.log(res.data)
          }
        })
    }else{
      wx.showModal({
        title: '提示',
        content: '您还没有登录哦！',
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
  bindKeyPhone: function (e) {
    var key = e.currentTarget.id
    this.setData({
      [key]: e.detail.value
    })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo')
    var token = wx.getStorageSync('token')
    var userid = wx.getStorageSync('userid')
    console.log('aaaa')
    let that = this
    if (userinfo && token && userid) {
      wx.request({
        url: `${config.api}/user/userinfo/${userid}`,
        method: 'GET',
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          var data = res.data.model
          console.log(data)
          that.setData(
            data
          )
        }
      })
    }
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
