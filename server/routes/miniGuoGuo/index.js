module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const qusers = require('./quser')
    const Guoadvertise = require('../../models/Guoadvertise')
    const Guopostinc = require('../../models/Guopostinc')
    const Guosystem = require('../../models/Guosystem')
    const Guoman = require('../../models/Guoman')
    const Guofeedback = require('../../models/Guofeedback')

    //获取广告
    //获取接口开发完成
    router.get('/advertise', async (req, res) => {
        const model = await Guoadvertise.find()
        res.send(model)
    })
    //获取系统基本信息
    //获取接口开发完成
    router.get('/system', async (req, res) => {
        const model = await Guosystem.find()
        res.send(model)
    })
    //获取快递公司列表
    //获取接口开发完成
    router.get('/postinc', async (req, res) => {
        const model = await Guopostinc.find()
        res.send(model)
    })
    //检测token是否过期
    router.post('/auth', qusers.checkToken)
    //换取token
    router.post('/login', qusers.login)
    //用户个人资料获取/提交/更新接口
    //接口开发完成   2019-10-28
    router.put('/user/userinfo', qusers.checkToken, qusers.users)
    router.get('/user/userinfo/:id', qusers.userinfo)
    // 获取总成交订单数
    // 已完成 2019-10-27
    // 测试成功
    const Order = require('../../models/Guoorder')
    router.get('/OrderCount', async (req, res) => {
        const model = await Order.find().count()
        res.send({ OrderNum: model })
    })
    router.post('/feedback', qusers.checkToken, async (req, res) => {
        console.log(req.body)
        if (req.body) {
            const model = await Guofeedback.create(req.body)
            res.send(model)
        } else {
            res.send({ 'success': false })
        }
    })

    // 获取用户订单
    router.get('/userOrders/:id', async (req, res) => {
        const model = await Order.find({ user: req.params.id, condition: { $lt: 5 } }).sort({ createdAt: -1 }).setOptions({ populate: 'postInc' })
        res.send(model)
    })
    // 获取已完成订单数
    router.get('/userOrdersDone/:id', async (req, res) => {
        const model = await Order.find({ user: req.params.id, condition: 5 })
        res.send(model)
    })
    // 获取订单状态
    router.post('/userOrders', qusers.checkToken, async (req, res) => {
        const model = await Order.findById(req.body.id).setOptions({ populate: ['postman', 'postInc'] })
        res.send(model)
    })
    // 订单状态更新
    router.put('/userOrders/:id', qusers.checkToken, async (req, res) => {
        const model = await Order.findByIdAndUpdate(req.params.id, req.body)
        console.log(model)
        res.send(model)
    })
    // 用户创建订单
    router.post('/pullOrders', qusers.checkToken, async (req, res) => {
        console.log(req.body)
        const model = await Order.create(req.body)
        console.log(model)

        res.send(model)
    })


    const config = require('../../plugins/config')
    const MAO = require('multer-aliyun-oss');
    const multer = require('multer')
    const upload = multer({
        // dest: __dirname + '/../../uploads'
        storage: MAO({
            config: config.oss
        })
    })
    app.post('/mini/api/upload', upload.single('pdf'), async (req, res) => {
        req.file.parent = req.body._id
        req.file.originalname = req.body.name
        req.file.url = `${config.ossUrl}/${req.file.filename}`
        const model = await Print.create(req.file)
        // const model = await Print.find().setOptions('parent').limit(10)
        console.log(model)
        return res.json(model)
    })
    app.use('/JYguoguo/api/', async (req, res, next) => {
        next()
    }, router)
}