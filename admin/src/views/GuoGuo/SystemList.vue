<template>
  <div class="list">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="index" label="ID" width="220"></el-table-column>
      <el-table-column prop="search" label="快递公司名称"></el-table-column>
      <el-table-column prop="server" label="快递联系电话"></el-table-column>
      <el-table-column prop="price" label="快递点地址"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/guosystems/edit/${scope.row._id}`)"
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
      const res = await this.$http.get("rest/guosystems");
      this.items = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>
