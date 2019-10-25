//景院裹裹小程序
//快递代取订单
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: { type: String },         //广告名称
        banner: { type: String },       //广告图片
        url: { type: String },          //广告指向
        remarks: { type: String },      //备注
        closingdate: { type: String }  //投放截止日期
    },
    { timestamps: true }
)

module.exports = mongoose.model('Guoadvertise', UserSchema)