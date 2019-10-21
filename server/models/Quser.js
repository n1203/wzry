const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        openId: { type: String },       //唯一Openid标识
        nickname: { type: String },     //用户昵称
        unionid: { type: String },
        headimgurl: { type: String },   //用户头像
        gender: { type: String },       //用户性别，1男2女
    },
    { timestamps: true }
)

module.exports = mongoose.model('Quser', UserSchema)