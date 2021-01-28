const   http    = require('http'), 
        router  = require('./router'),
        parser  = require('url')

// const { getLogs } = require('./log')
const { readFileWithPos } = require('./stream')
var FilePositon = 0

router.register('/log', async function(req, res) {
    url = parser.parse(req.url, true)
    var pos = url.query.pos

    try {
        res.writeHead(200, { "Content-type": "text" });

        if(FilePositon >= 0) {
            if (pos == 'forward')
                FilePositon += 1
            else if (pos == 'backward' && FilePositon >= 0)
                FilePositon -= 1
            else if (pos == 'backward' && FilePositon == 0)
                res.end("Top of the logs.")
        } else FilePositon = 0

        FilePositon = FilePositon >= 0 ? FilePositon : 0

        const logs = await readFileWithPos(FilePositon)
        res.end(logs)
    } catch (error) {
        console.log(error)
    }
})

function handleRequest(req, res) { 
    url = parser.parse(req.url, true)

    if(Object.keys(router.routeHandlers).includes(url.pathname)){
        router.routeHandlers[url.pathname](req, res)
    }
    else
        res.end("404 not found")
}

http.createServer(handleRequest).listen(8000, function() {
    console.log("Server listening on 8000")
})
