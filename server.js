const express = require('express')

const { db } = require('./data')

const app = express()

// 静态资源
app.use('/static', express.static(__dirname + '/static'))

// 数据接口


// 管理
app.get('/manage', (req, res) => {
    res.redirect('/static/manage/index.html')
})


//
app.listen(80, () => {
    const f = () => console.log('i am listening!', ' :', (new Date()).toString().slice(0, 24))
    f()
    setInterval(f, 60000)
})