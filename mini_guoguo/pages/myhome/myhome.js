const config = require('../../config/config.js');


// pages/myhome/post.js
// Page({

//   /**
//    * 页面的初始数据
//    *///index.js
//获取应用实例
const app = getApp()

Component({
    data:{
      balance:"3",
      userday:1,
      motto: 'Hello World',
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    methods:{
      getUserInfo: function (e) {
        let that = this
        app.globalData.userInfo = e.detail.userInfo
        that.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        var userid = wx.getStorageSync('userid');
        console.log(userid)
        wx.request({
          url: `${config.api}/user/userinfo/${userid}`,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data.model) {
              that.setData({
                userInfo: res.data.model,
                hasUserInfo: true
              })
            }
          }
        })
      },
//获取时间差
      getNowDate :function () {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var dateStr = year + '-' + getFormatDate(month) + '-' + getFormatDate(day);
        return dateStr;
      },

//获取两个日期的相差日期数(differ 相差天数：1、相差小时数：2、相差分钟数：3、相差秒数：4)
      getDifferDate : function (firstDate, secondDate, differ) {
        //1)将两个日期字符串转化为日期对象
        var startDate = new Date(firstDate);
        var endDate = new Date(secondDate);
        //2)计算两个日期相差的毫秒数
        var msecNum = endDate.getTime() - startDate.getTime();
        //3)计算两个日期相差的天数
        var dayNum = Math.floor(msecNum / parseFloat(24 * 60 * 60 * 1000));
        return dayNum;
      },

      gofeedback: function () {
        wx.navigateTo({
          url: `/pages/feedback/feedback`
        })
      },
      gouserinfo: function () {
        wx.navigateTo({
          url: `/pages/userinfo/userinfo`
        })
      }

    },

    pageLifetimes: {
      show() {
        let that = this
        var userinfo = wx.getStorageSync('userinfo')
        if(userinfo){
          that.setData({
            userInfo: userinfo.model,
            hasUserInfo: true
          })
        }
        var lastdate = userinfo.model.createdAt
        var nowdata = new Date()
        var result = this.getDifferDate(lastdate, nowdata, 1);   
        that.setData({
          userday: result
        })
        // 发送后台换取 用户资料
        this.getTabBar().setData({
          // 跳转驿站页面
          selected: 2
        });
      }
    },
    
    attached: function () {
    },
})