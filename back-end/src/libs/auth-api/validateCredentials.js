const { ErrorHandler } = require("../../utils/error")
const bcrypt = require("bcrypt")

let { User } = require("../../models")

const INVALID_CREDENTIALS_ERROR = new ErrorHandler(400, "InvalidCredentials", [
    "Email or password is incorrect. Please try again."
])

module.exports = async ({ email, password }) => {
    let user = await User.scope('withPassword').findOne({ where: { email } })
    if (!user) throw INVALID_CREDENTIALS_ERROR
    if (user.oauth_id) throw new ErrorHandler(400, "InvalidCredentials", [
        "This email is linked to Voltox, please sign in using Voltox."
    ])
    const match = await bcrypt.compare(password, user.password);
    user.password = undefined
    if (match) return user;
    else throw INVALID_CREDENTIALS_ERROR
}
