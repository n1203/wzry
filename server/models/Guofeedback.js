//景院裹裹小程序
//问题反馈
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        content: { type: String },       //文章内容
        parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Quser' },        //发布人ID
    },
    { timestamps: true }
)

module.exports = mongoose.model('Guofeedback', UserSchema)