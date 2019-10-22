const jwt = require('jsonwebtoken')
const User = require('../../models/Quser')
const Qdetile = require('../../models/Qdetile')
const System = require('../../models/System')

const config = require('../../plugins/config')
const axios = require('axios')

let generateToken = function (user) {
    return jwt.sign(user, config.jwtSecret, {
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

exports.login = (req, res) => {
    // const userData = JSON.parse(req.body.rawdata)
    const queryString = `appid=${config.appId}&secret=${config.appSecret}&js_code=${req.body.code}&grant_type=authorization_code`;
    const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`;
    // https://api.q.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    axios.get(wxAPI)
        .then(response => {
            User.findOne({ openId: response.data.openid }, (err, user) => {
                if (user) {
                    console.log(user)
                    return res.json({
                        token: generateToken({ openid: response.data.openid }),
                        openid: response.data.openid
                    })
                } else {
                    const user = new User();
                    user.openId = response.data.openid;
                    user.save();
                    return res.json({
                        token: generateToken({
                            openid: response.data.openid
                        }),
                        openid: response.data.openid

                    })
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
}

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


// 用户个人资料
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

    console.log()
    // const userData = req.body
    // if (userData.userData) {
    //     user.nickname = userData.userData.nickName;
    //     user.headimgurl = userData.userData.avatarUrl;
    //     user.gender = userData.userData.gender;
    //     user.save();
    // }
    // const qdetile = new Qdetile();
    // qdetile = req.body.udetile;
    // qdetile.save()
}