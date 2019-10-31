<template>
  <div>
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img
            style="width:100px;height:100px"
            v-if="model.avatarUrl"
            :src="model.avatarUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input disabled v-model="model.nickName"></el-input>
      </el-form-item>
      <el-form-item label="唯一Openid标识">
        <el-input disabled v-model="model.openId"></el-input>
      </el-form-item>
      <el-form-item label="unionid">
        <el-input disabled v-model="model._id"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input disabled v-model="model.gender=='2'?'女':'男'"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-input disabled v-model="model.country+model.province+model.city"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="model.phone"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="model.learncode"></el-input>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="model.weixin"></el-input>
      </el-form-item>
      <el-form-item label="qq">
        <el-input v-model="model.qq"></el-input>
      </el-form-item>
      <el-form-item label="用户宿舍号">
        <el-input v-model="model.address"></el-input>
      </el-form-item>
      <el-form-item label="用户生日">
        <el-input v-model="model.birthday"></el-input>
      </el-form-item>
      <el-form-item label="用户入学年份">
        <el-input v-model="model.grade"></el-input>
      </el-form-item>
      <el-form-item label="用户系别">
        <el-input v-model="model.tie"></el-input>
      </el-form-item>
      <el-form-item label="用户班级">
        <el-input v-model="model.class"></el-input>
      </el-form-item>
      <el-form-item label="裹裹积分">
        <el-input v-model="model.guoguo"></el-input>
      </el-form-item>
      <el-form-item label="用户个性签名">
        <el-input type="textarea" v-model="model.signature"></el-input>
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
        res = await this.$http.put(`rest/qusers/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/qusers", this.model);
      }
      this.$router.push("list");
      this.$message({
        type: "success",
        message: "保存成功！"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/qusers/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/qusers`);
      this.parnets = res.data;
    }
  },
  created() {
    this.fetchParents();
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
  width: 178px;
  height: 178px;
  display: block;
}
</style>