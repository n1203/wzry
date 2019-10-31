const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        // 首页
        index: { type: String },      //标题文字
        search: { type: String },       //搜索栏文字
        server: { type: String },      //取快递按钮内容
        price: { type: String },      //价格提示
    },
    { timestamps: true }
)

module.exports = mongoose.model('Guosystem', UserSchema)