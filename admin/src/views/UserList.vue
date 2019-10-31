<template>
  <div class="list">
    <h1>用户列表</h1>
    <el-table :data="items">
      <el-table-column prop="avatarUrl" width="60" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" style="height:3rem" />
        </template>
      </el-table-column>
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="openId" width="260" label="用户OpenID"></el-table-column>
      <el-table-column prop="nickName" width="100" label="用户名称"></el-table-column>
      <el-table-column prop="gender" width="60" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.gender==2?'女':'男'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" width="200" label="注册时间"></el-table-column>
      <el-table-column prop="updatedAt" width="200" label="最后登录时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/users/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
    },
    async remove(row) {
      this.$confirm(`是否要删除用户：“${row.nickName}”`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/qusers/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
