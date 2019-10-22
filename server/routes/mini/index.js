module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const qusers = require('./quser')
    //检测token是否过期
    router.post('/auth', qusers.checkToken)
    router.get('/', qusers.now)
    //换取token
    router.post('/login', qusers.login)
    router.post('/users', qusers.users)
    //初始化用户资料
    router.post('/user', qusers.checkToken, async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    app.use('/mini/api/', async (req, res, next) => {
        next()
    }, router)
}