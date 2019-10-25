<template>
  <div>
    <h1>景院裹裹小程序系统设置</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="首页标题">
        <el-input v-model="model.index"></el-input>
      </el-form-item>
      <el-form-item label="首页搜索条内容">
        <el-input v-model="model.search"></el-input>
      </el-form-item>
      <el-form-item label="取快递按钮内容">
        <el-input v-model="model.server"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      console.log(this.model);
      res = await this.$http.put(
        `rest/guosystems/${this.model._id}`,
        this.model
      );
      this.$message({
        type: "success",
        message: "保存成功！"
      });
      this.fetch();
    },
    async fetch() {
      const res = await this.$http.get(`rest/guosystems`);
      console.log(res.data[0]);
      this.model = res.data[0];
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 540px;
  height: 319px;
  display: block;
}
</style>