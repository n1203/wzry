const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        // 首页
        index: { type: String },      //首页头图
        search: { type: String },       //首页跑马灯
        server: { type: String },      //打印页头图
    },
    { timestamps: true }
)

module.exports = mongoose.model('Guosystem', UserSchema)