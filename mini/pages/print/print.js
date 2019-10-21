Page({
    data: {
        array: ['A4黑白单面', 'A4黑白双面'],
        index: 0,
        active: 1
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    backindex: function () {
        console.log("a")
        wx.navigateBack({
            delta: 1
        })
    }
})