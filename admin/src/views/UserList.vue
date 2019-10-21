<template>
  <div class="list">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="openId" label="用户OpenID"></el-table-column>
      <el-table-column prop="nickname" label="用户名称"></el-table-column>
      <el-table-column prop="headimgurl" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.headimgurl" style="height:3rem" />
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.gender==2?'女':'男'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="注册时间"></el-table-column>
      <el-table-column prop="updatedAt" label="最后登录时间"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/qusers");
      this.items = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>
