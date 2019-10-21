const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        //父级id
        parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Quser' },
        //用户基本信息
        phone: { type: String },        //用户手机号
        weixin: { type: String },       //用户微信号
        qq: { type: String },           //用户QQ号
        address: { type: String },      //用户宿舍号
        birthday: { type: String },     //用户生日
        grade: { type: String },        //用户入学年份
        tie: { type: String },          //用户系别
        class: { type: String },        //用户班级
        signature: { type: String },    //用户个性签名
        //打印信息
        printCount: { type: String },   //打印余量积分
        printNum: { type: String },     //总打印数
        printUpdateAt: { type: String }, //最后打印时间
    },
    { timestamps: true }
)

module.exports = mongoose.model('Qdetile', UserSchema)