var routeHandlers = {}

function register(url, method) {
    routeHandlers[url] = method
}

module.exports = {
    routeHandlers,
    register
}