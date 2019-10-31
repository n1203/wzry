module.exports = {
    // db uri
    db: 'mongodb://127.0.0.1:27017/test',
    // Setting port for server
    port: 3000,
    host: 'http://localhost:3000',
    JYpeople: {
        jwtSecret: 'JDZkuaidiankejidapingxi',
        appId: 'wxadc4ef260d8b419b',
        appSecret: 'fa04679eede366cdf727397493ab1673',
    },
    GuoGuo: {
        jwtSecret: 'JDZkuaidiankejidapingxi',
        appId: 'wxadc4ef260d8b419b',
        // appId: 'wx3f969596f8f7d2be',
        appSecret: '977bd935e5046ebd61c9a286f2fad2d7',
    },
    //阿里云OSS配置信息
    ossUrl: 'https://kd-print.oss-cn-hangzhou.aliyuncs.com/',
    oss: {
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAI4FuEdNh4qDLY31xDCdNt',
        accessKeySecret: '7aXBsWvWmw2MQlyJkWQVLsoNztDr1r',
        bucket: 'kd-print'
    }
}