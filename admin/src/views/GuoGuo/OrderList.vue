<template>
  <div class="list">
    <h1>订单列表</h1>
    <el-table :data="items" stripe fit>
      <el-table-column prop="postId" label="运单号"></el-table-column>
      <el-table-column width="100" prop="address" label="收货地址"></el-table-column>
      <el-table-column width="100" prop="price" label="悬赏金额"></el-table-column>
      <el-table-column width="100" prop="size" label="包裹大小"></el-table-column>
      <el-table-column width="100" prop="parent.postInc" label="快递公司"></el-table-column>
      <el-table-column width="100" prop="user.nickName" label="发布者"></el-table-column>
      <el-table-column width="100" prop="parent.postman" label="配送员"></el-table-column>
      <el-table-column prop="time" label="上传时间"></el-table-column>
      <el-table-column prop="condition" label="订单状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/guoorders/edit/${scope.row._id}`)"
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
      const res = await this.$http.get("rest/guoorders");
      this.items = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/guoorders`);
      console.log(res);
      this.parnets = res.data;
    },
    async remove(row) {
      this.$confirm(`是否要删除订单：“${row.postId}”`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/guoorders/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetchParents();
    this.fetch();
  }
};
</script>
