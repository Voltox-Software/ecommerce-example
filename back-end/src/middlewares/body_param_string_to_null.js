

module.exports = (key) => (req,res,next) => {
    if (req.body[key] && req.body[key] === "null") {
        req.body[key] = null
    }
    return next();
}