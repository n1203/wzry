const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        openId: { type: String },       //唯一Openid标识
        nickname: { type: String },     //用户昵称
        unionid: { type: String },
        headimgurl: { type: String },   //用户头像
        gender: { type: String },       //用户性别，1男2女
        //用户基本信息
        phone: { type: String },        //用户手机号
        learncode: { type: String },    //用户学号
        weixin: { type: String },       //用户微信号
        qq: { type: String },           //用户QQ号
        address: { type: String },      //用户宿舍号
        birthday: { type: String },     //用户生日
        grade: { type: String },        //用户入学年份
        tie: { type: String },          //用户系别
        class: { type: String },        //用户班级
        signature: { type: String },    //用户个性签名
        guoguo: { type: Number },        //用户裹裹积分
    },

    { timestamps: true }
)

module.exports = mongoose.model('Quser', UserSchema)