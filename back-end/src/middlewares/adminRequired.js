
const { ErrorHandler } = require("../utils/error");

module.exports = async (req, res, next) => {
    if (
        !req.user || 
        !req.user.isAdmin
    ) throw new ErrorHandler(401, "Unauthorized");
    return next();
}