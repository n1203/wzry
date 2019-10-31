const app = getApp();
Component({
  //数据
  data: {
    selected: 0,//当前tabBar页面
    color: "#000",//未选中tabBar时的文字颜色
    selectedColor: "#307AF7",//选中时tabBar文字颜色
    addImgPath: '/iconfont-img/service.png',//添加发布图标
    // tabBar对象集合
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/iconfont-img/home.png",
        selectedIconPath: "/iconfont-img/click-home.png",
        text: "首页"
      },
      {
        pagePath: "/pages/yellow/yellow",
        iconPath: "/iconfont-img/post.png",
        selectedIconPath: "/iconfont-img/click-post.png",
        text: "驿站"
      },
      {
        pagePath: "/pages/myhome/myhome",
        iconPath: "/iconfont-img/my.png",
        selectedIconPath: "/iconfont-img/click-my.png",
        text: "我的"
      }
    ]
  },
  methods: {
    // tabBar切换事件
    tab_bar_index(e) {
      const url = e.currentTarget.dataset.path
      wx.switchTab({ url })
    },

    // 在线客服
    tab_bar_add() {
      var url = "/pages/service/service"
      wx.navigateTo({ url })
    }
  }
})