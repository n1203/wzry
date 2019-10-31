<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['2','4']">
        <el-submenu index="0">
          <template slot="logo">快递科技管理系统</template>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新增物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新增英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>用户管理
          </template>
          <el-menu-item-group>
            <template slot="title">用户</template>
            <el-menu-item index="/users">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>在线打印小程序
          </template>
          <el-menu-item-group>
            <template slot="title">系统设置</template>
            <el-menu-item index="/systems/edit">系统设置</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">校园博文</template>
            <el-menu-item index="/users">博文列表</el-menu-item>
            <el-menu-item index="/users">新增博文</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文件</template>
            <el-menu-item index="/prints">上传文件列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-message"></i>景院裹裹小程序
          </template>
          <el-menu-item-group>
            <template slot="title">系统设置</template>
            <el-menu-item index="/guosystems/edit">系统设置</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">裹裹</template>
            <el-menu-item index="/guoorders/list">裹裹列表</el-menu-item>
            <el-menu-item index="/guoorders/edit">新增裹裹</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">裹派</template>
            <el-menu-item index="/guomans/list">裹派列表</el-menu-item>
            <el-menu-item index="/guomans/edit">新增裹派</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">快递公司</template>
            <el-menu-item index="/guopostincs/edit">新增快递公司</el-menu-item>
            <el-menu-item index="/guopostincs/list">快递公司列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">广告管理</template>
            <el-menu-item index="/guoadvertises/edit">新增广告</el-menu-item>
            <el-menu-item index="/guoadvertises/list">广告列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">问题反馈</template>
            <el-menu-item index="/guofeedbacks/list">反馈列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>
