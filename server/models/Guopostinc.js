//景院裹裹小程序
//快递代取订单
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: { type: String },         //快递公司名称
        phone: { type: String },        //快递联系电话
        address: { type: String },      //快递点地址
        icon: { type: String },         //快递logo
    },
    { timestamps: true }
)

module.exports = mongoose.model('Guopostinc', UserSchema)