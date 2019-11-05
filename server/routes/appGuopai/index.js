module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Guopostinc = require('../../models/Guopostinc')
    const Guoman = require('../../models/Guoman')
    const Order = require('../../models/Guoorder')
    // 获取平台未接单列表
    router.get('/getOrderCount/:id', async (req, res) => {
        const model = await Order.find({ condition: req.params.id }, 'condition name address time postInc user').sort({ createdAt: -1 }).setOptions({
            populate: [{
                path: 'user',
                select: 'phone'
            }, {
                path: 'postInc',
                select: 'name icon'
            }]
        })

        res.send(model)
    })
    // 接单
    router.post('/setOrderCount', async (req, res) => {
        const orderId = req.body.params.orderId
        const model = await Order.findByIdAndUpdate(orderId, { $inc: { condition: 1 } })
        res.send(model)
    })
    router.get('/postInc', async (req, res) => {
        const model = await Guopostinc.find()
        res.send(model)
    })
    // 获取用户订单
    // router.get('/userOrders/:id', async (req, res) => {
    //     const model = await Order.find({ user: req.params.id, condition: { $lt: 5 } }).sort({ createdAt: -1 }).setOptions({ populate: 'postInc' })
    //     res.send(model)
    // })
    router.get('/userOrders/:id', async (req, res) => {
        const model = await Order.find({ condition: 1 }).sort({ createdAt: -1 }).setOptions({ populate: 'postInc' })
        res.send(model)
    })
    // 获取已完成订单数
    router.get('/userOrdersDone/:id', async (req, res) => {
        const model = await Order.find({ user: req.params.id, condition: 5 })
        res.send(model)
    })
    app.use('/JYguopai/api/', async (req, res, next) => {
        next()
    }, router)
}