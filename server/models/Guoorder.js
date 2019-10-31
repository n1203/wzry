//景院裹裹小程序
//快递代取订单
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        postId: { type: String },       //运单号
        name: { type: String },       //收件人名称
        message: { type: String },      //快递短信
        address: { type: String },      //收货地址
        price: { type: String },        //悬赏金额
        size: { type: String },         //包裹大小
        user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Quser' },        //发布人ID
        postman: { type: mongoose.SchemaTypes.ObjectId, ref: 'Guoman' },     //配送员ID
        assess: { type: String },       //评价
        mark: { type: Number },         //评分
        condition: { type: Number, default: 0 },    //订单当前状态,0订单创建成功，1表示已接单，2表示已取件，3表示配送中，4表示已结单，5表示订单异常
        conditions: { type: Number, default: 0 },   //订单当前催单状态,0订单未催单，1表示催单
        time: { type: String },         //下单时间
        postInc: { type: mongoose.SchemaTypes.ObjectId, ref: 'Guopostinc' },     //快递公司
        abnormal: { type: String },     //订单异常信息
        abnormalcode: { type: Number }, //订单异常状态码
    },
    { timestamps: true }
)

module.exports = mongoose.model('Guoorder', UserSchema)