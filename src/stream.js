const fs = require('fs')

module.exports = {
    readFileWithPos : function (FilePosition) {
        return new Promise(function(resolve, request) {
            const file = fs.createReadStream('example.txt', { start: FilePosition * 1024 , end: (FilePosition + 1) * 1024, highWaterMark:1024})
            file.on('data',(chunk) => {
                resolve(chunk.toString())
            })    
        })
    }
}