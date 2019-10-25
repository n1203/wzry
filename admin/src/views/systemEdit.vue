<template>
  <div>
    <h1>小程序系统设置</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="跑马灯公告">
        <el-input v-model="model.indexlight"></el-input>
      </el-form-item>
      <el-form-item label="首页头图">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload1"
        >
          <img v-if="model.indeximgurl" :src="model.indeximgurl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="打印页头图">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload2"
        >
          <img v-if="model.printimgurl" :src="model.printimgurl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="版本号">
        <el-input v-model="model.version"></el-input>
      </el-form-item>
      <el-form-item label="关于我们">
        <el-input v-model="model.about"></el-input>
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
    afterUpload1(res) {
      this.$set(this.model, "indeximgurl", res.url);
    },
    afterUpload2(res) {
      this.$set(this.model, "printimgurl", res.url);
    },
    async save() {
      let res;
      console.log(this.model);
      res = await this.$http.put(`rest/systems/${this.model._id}`, this.model);
      this.$message({
        type: "success",
        message: "保存成功！"
      });
      this.fetch();
    },
    async fetch() {
      const res = await this.$http.get(`rest/systems`);
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