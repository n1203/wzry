const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        openId: { type: String },       //唯一Openid标识
        nickName: { type: String },     //用户昵称
        avatarUrl: { type: String },   //用户头像
        gender: { type: String },       //用户性别，1男2女
        language: { type: String },       //用户语言
        city: { type: String },       //用户城市
        province: { type: String },       //用户省份
        country: { type: String },       //用户国家
        //用户基本信息
        phone: { type: String, default: '手机号' },        //用户手机号
        learncode: { type: String, default: '学号' },    //用户学号
        weixin: { type: String, default: '微信号' },       //用户微信号
        qq: { type: String, default: 'QQ号' },           //用户QQ号
        address: { type: String, default: '宿舍' },      //用户宿舍号
        birthday: { type: String, default: '生日' },     //用户生日
        grade: { type: String, default: '入学年份' },        //用户入学年份
        tie: { type: String, default: '院系' },          //用户系别
        class: { type: String, default: '班级' },        //用户班级
        signature: { type: String, default: '还没有写过个性签名哦' },    //用户个性签名
        guoguo: { type: Number, default: 0 },        //用户裹裹积分
    },

    { timestamps: true }
)

module.exports = mongoose.model('Quser', UserSchema)