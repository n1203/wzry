module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const qusers = require('./quser')
    const Print = require('../../models/Print')
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
    app.use('/mini/api/', async (req, res, next) => {
        next()
    }, router)
}