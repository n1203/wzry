<style scoped>
.layout {
  background: #f5f7f9;
  height: 100vh;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
}
.layout-assistant {
  width: 300px;
  margin: 0 auto;
  height: inherit;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
a {
  color: #9ea7b4;
}
</style>
<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark" active-key="1">
      <div class="layout-logo" style="text-align:center;line-height:30px;color:#fff">KDPrint</div>
      <div class="layout-nav">
        <Menu-item key="1">
          <Icon type="ios-navigate"></Icon>
          <router-link to="/">首页</router-link>
        </Menu-item>
        <Menu-item key="2">
          <Icon type="ios-keypad"></Icon>
          <router-link to="/system">系统</router-link>
        </Menu-item>
        <Menu-item key="3">
          <Icon type="ios-analytics"></Icon>
          <router-link to="/master">罗盘</router-link>
        </Menu-item>
        <Menu-item key="4">
          <Icon type="ios-paper"></Icon>
          <router-link to="/setter">设置</router-link>
        </Menu-item>
      </div>
    </Menu>
    <div class="layout-content">
      <router-view></router-view>
    </div>
    <div class="layout-copy">2019-2020 &copy; KuaiDian Sic</div>
  </div>
</template>
<script>
export default {};
</script>
