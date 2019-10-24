//用户打印文件上传模型
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
        fieldname: { type: String },      //上传字段名称
        originalname: { type: String },   //原始文件名称
        encoding: { type: String },       //文件编码
        filename: { type: String },       //文件名称
        url: { type: String },            //文件地址
        //父级id
        parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Quser' }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Print', UserSchema)