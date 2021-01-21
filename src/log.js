const fs = require('fs')
var buffer = new Buffer.alloc(1024)

module.exports = {
    getLogs: function(filePositon) {
        return new Promise(function(resolve, request) {
            fs.open('example.txt', 'r', function(err, fd) {
                if (err) console.error(error)
            
                fs.read(fd, buffer, 0,buffer.length, filePositon, function(err, bytes) {
                    if (err) console.error(error)
            
                    if (bytes > 0) resolve(buffer.slice(0, bytes).toString())
            
                    fs.close(fd, function(err) {
                        if (err) console.error(err)
                    })
                })
            })
        })
    }
}