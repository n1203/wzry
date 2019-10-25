<template>
  <div>
    <h1>{{id?'编辑':'新建'}}快递公司</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="快递公司">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="model.phone"></el-input>
      </el-form-item>
      <el-form-item label="快递点地址">
        <el-input v-model="model.address"></el-input>
      </el-form-item>
      <el-form-item label="物品图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/guopostincs/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/guopostincs", this.model);
      }
      this.$router.push("list");
      this.$message({
        type: "success",
        message: "保存成功！"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/guopostincs/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
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