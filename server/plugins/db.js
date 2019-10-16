module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true }, function (err) {
        if (err) {
            console.log('Connection Error:' + err)
        } else {
            console.log('Connection success!')
        }
    })
}