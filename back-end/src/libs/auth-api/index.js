const express = require("express");
const { allowCrossDomain, jwtRequired, validateRequest } = require("../../middlewares");

const app = module.exports = express();

const { ErrorHandler } = require("../../utils/error")

const createToken = require("../utils/createToken")
const { findUserByPk } = require("../users-dal");
const { post_auth, get_auth_voltox } = require("./validations");

const validateCredentials = require("./validateCredentials")
const voltox = require("voltox");
const { User } = require("../../models");

const getResponse = user => ({
    status: "success",
    code: 200,
    message: "Authorized",
    data: {
        token: createToken(user.id),
        user
    }
})

app.use(allowCrossDomain)

app.get('/auth', jwtRequired, async (req, res) => {
    let user = await findUserByPk(req.auth.userId);
    if (!user) throw new ErrorHandler(401, "Unauthorized")
    return res.json(getResponse(user))
});

app.get("/auth/voltox", validateRequest(get_auth_voltox), async (req,res) => {
    let { access_token } = req.query;
    let voltox_user = await voltox.getServiceUser({ token: access_token })
    let found_user = await User.findOne({ where: { oauth_id: voltox_user.id }});
    if (found_user) return res.json(getResponse(found_user));
    let { id: oauth_id, first_name, last_name, email } = voltox_user;
    let user = await User.create({ 
        first_name, last_name, email, oauth_id
    })
    return res.json(getResponse(user))
})

app.post('/auth', validateRequest(post_auth), async (req, res) => {
    let user = await validateCredentials(req.body)
    return res.json(getResponse(user))
});
