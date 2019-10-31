// 模块引入
const axios = require('axios')
const jwt = require('jsonwebtoken')
// 配置信息
const config = require('../../plugins/config')
// 数据库模型
const User = require('../../models/Quser')
const Qdetile = require('../../models/Qdetile')
const System = require('../../models/System')
// 设置jwt
let generateToken = function (user) {
    return jwt.sign(user, config.JYpeople.jwtSecret, {
        expiresIn: 7200
    })
}
//获取页面初始化资料
exports.now = async (req, res) => {
    const queryOptions = {}
    const model = await System.find().setOptions(queryOptions)
    return res.json({
        model
    })
}
//小程序用户登录
exports.login = (req, res) => {
    const queryString = `appid=${config.JYpeople.appId}&secret=${config.JYpeople.appSecret}&js_code=${req.body.code}&grant_type=authorization_code`;
    const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`;
    axios.get(wxAPI)
        .then(response => {
            User.findOne({ openId: response.data.openid }, (err, user) => {
                if (user) {
                    console.log(user)
                    return res.json({
                        token: generateToken({ openid: response.data.openid }),
                        openid: response.data.openid,
                        id: user._id
                    })
                } else {
                    const user = new User();
                    user.openId = response.data.openid;
                    user.save();
                    return res.json({
                        token: generateToken({
                            openid: response.data.openid,
                        }),
                        openid: response.data.openid,
                        id: user._id
                    })
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
}
//登录token校验
exports.checkToken = (req, res, next) => {
    let token = req.headers.authorization;
    console.log(token);
    if (token) {
        console.log('token exist');
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            console.log('jwt.verify');
            if (err) {
                console.log('err');
                if (err.name === 'TokenExpiredError') {
                    console.log('认证码失效，请重新登录!');
                    return res.status(401).json({ error: '认证码失效，请重新登录!' });
                } else {
                    console.log('认证失败！');
                    return res.status(401).json({ error: '认证失败！' });
                }
            } else {
                if (decoded.openid) {
                    req.openid = decoded.openid;
                    console.log('req.openid = decoded.openid;');
                    const wxAPI2 = `https://api.weixin.qq.com/wxa/getpaidunionid?access_token=ACCESS_TOKEN&openid=OPENID`
                    return res.status(200).json({ message: '已登录' });
                } else {
                    console.log('认证失败！');
                    res.status(401).json({ error: '认证失败！' });
                }
            }
        });
    } else {
        console.log("no token");
        return res.status(403).json({
            error: '请提供认证码！'
        });
    }
}
// 用户个人资料更新
exports.users = (req, res) => {
    const userData = req.body.userData.detail.userInfo
    const openid = req.body.openid
    User.findOne({ openId: openid }, (err, user) => {
        if (user) {
            user.nickname = userData.nickName;
            user.headimgurl = userData.avatarUrl;
            user.gender = userData.gender;
            user.save();
            return res.json({
                user
            })
        }
    })
}