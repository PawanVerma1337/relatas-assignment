const   http    = require('http'), 
        router  = require('./router'),
        parser  = require('url')

const { getLogs } = require('./log')
var FilePositon = 0

router.register('/log', async function(req, res) {
    url = parser.parse(req.url, true)
    var pos = url.query.pos

    res.writeHead(200, { "Content-type": "text" });

    if (pos == 'forward')
        FilePositon += 1024
    else if (pos == 'backward' && FilePositon != 0)
        FilePositon -= 1024
    else if (pos == 'backward' && FilePositon == 0)
        res.end("Top of the logs.")
    
    const logs = await getLogs(FilePositon)
    res.end(logs)
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
