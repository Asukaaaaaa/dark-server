const fs = require('fs')

const parsePath = path => {
    path = path.split('/')
    !path[0].length && (path = path.slice(1, path.length))
    path.length && !path[path.length - 1].length && (path = path.slice(0, path.length - 1))
    return path
}

const _hash = obj => JSON.stringify(obj)

const db = new (function () {
    this.data = ['user', 'base', 'order'].reduce((acc, name, i) => {
        const arr = []
        arr.info = new Map()
        arr.push = val => {
            const hash = _hash(val)
            let i = arr.info.get(hash)
            if (!i) {
                i = arr.length + 1
                Array.prototype.push.call(arr, Object.assign(val, { id: i - 1 }))
                arr.info.set(hash, i)
            }
            return i
        }
        acc[name] = arr
        return acc
    }, {})

    //
    const _get = (pathArr = []) => {
        let data = this.data
        for (let name of pathArr)
            data[name] && (data = data[name])
        return data
    }
    this.get = (path) => {
        return _get(parsePath(path))
    }
    this.set = (path, val) => {
        pathArr = parsePath(path)
        let obj = _get(pathArr.slice(0, pathArr.length - 1))
        obj[pathArr[pathArr.length - 1]] = val
    }
    this.insert = (path, val) => {
        const arr = this.get(path)
        return arr.push(val) - 1
    }


    // 
    this.init = () => {
        fs.readFile('data.json', (e, data) => {
            Object.assign(this.data, JSON.parse(data))
        })
    }
    this.save = () => {
        fs.writeFile('data.json', JSON.stringify(this.data), console.log)
    }

})()

module.exports = {
    db: db
}