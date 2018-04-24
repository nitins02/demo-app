
function Response(code, message) {
    this.statusCode = code;
    this.message = message;
}

module.exports = Response;