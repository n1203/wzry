//景院裹裹小程序
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: { type: String },         //姓名
        sex: { type: String },          //性别
        phone: { type: String },        //手机号
        qq: { type: String },           //QQ号
        address: { type: String },      //宿舍号
        class: { type: String }        //班级系别
    },
    { timestamps: true }
)

module.exports = mongoose.model('Guoman', UserSchema)