<template>
  <div class="list">
    <h1>分类列表</h1>
    <el-table :data="items" stripe fit>
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="filename" label="OSS文件名称"></el-table-column>
      <el-table-column width="400" prop="originalname" label="原始文件名称"></el-table-column>
      <el-table-column width="100" prop="encoding" label="文件编码"></el-table-column>
      <el-table-column width="100" prop="parent.nickname" label="上传者"></el-table-column>
      <el-table-column prop="createdAt" label="上传时间"></el-table-column>
      <el-table-column prop="url" label="文件地址">
        <template slot-scope="scope">
          <el-link :href="scope.row.url" target="_blank">
            查看文件
            <i class="el-icon-view el-icon--right"></i>
          </el-link>
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
      const res = await this.$http.get("rest/prints");
      this.items = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/prints`);
      console.log(res);
      this.parnets = res.data;
    }
  },
  created() {
    this.fetchParents();
    this.fetch();
  }
};
</script>
