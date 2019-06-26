const fs = require('fs')



const db = new (function () {
    this.init = () => {
        fs.readFile('data.json', (e, data) => {
            Object.assign(this.data, JSON.parse(data))
        })
    }
    this.save = () => {
        fs.writeFile('data.json', JSON.stringify(this.data))
    }

})()

module.exports = {
    db: db
}