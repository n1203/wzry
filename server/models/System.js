const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        // 首页
        indeximgurl: { type: String },      //首页头图
        indexlight: { type: String },       //首页跑马灯
        // 打印页
        printimgurl: { type: String },      //打印页头图
        //小程序信息
        version: { type: String },          //小程序版本
        about: { type: String },            //小程序关于我们
    },
    { timestamps: true }
)

module.exports = mongoose.model('System', UserSchema)