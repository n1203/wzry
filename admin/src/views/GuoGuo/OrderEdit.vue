<template>
  <div>
    <h1>{{id?'编辑':'新建'}}裹裹</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="运单号">
        <el-input v-model="model.postId"></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input v-model="model.address"></el-input>
      </el-form-item>
      <el-form-item label="悬赏金额">
        <el-input v-model="model.price"></el-input>
      </el-form-item>
      <el-form-item label="包裹大小">
        <el-input v-model="model.size"></el-input>
      </el-form-item>
      <el-form-item label="悬赏金额">
        <el-input v-model="model.time"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-input v-model="model.condition"></el-input>
      </el-form-item>
      <el-form-item label="上传时间">
        <el-input v-model="model.time"></el-input>
      </el-form-item>
      <el-form-item label="快递公司">
        <el-select v-model="model.postInc">
          <el-option v-for="item in postInc" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布者">
        <el-select v-model="model.user">
          <el-option v-for="item in user" :key="item._id" :label="item.nickname" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配送员">
        <el-select v-model="model.postman">
          <el-option v-for="item in postman" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
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
      model: {},
      postInc: [],
      user: [],
      postman: []
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/guoorders/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/guoorders", this.model);
      }
      this.$router.push("list");
      this.$message({
        type: "success",
        message: "保存成功！"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/guoorders/${this.id}`);
      this.model = res.data;
    },
    async fetchPostmans() {
      const res = await this.$http.get(`rest/guomans`);
      this.postman = res.data;
    },
    async fetchUsers() {
      const res = await this.$http.get(`rest/qusers`);
      this.user = res.data;
    },
    async fetchPostincs() {
      const res = await this.$http.get(`rest/guopostincs`);
      this.postInc = res.data;
    }
  },
  created() {
    this.fetchPostmans();
    this.fetchUsers();
    this.fetchPostincs();
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