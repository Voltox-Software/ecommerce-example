if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const app = module.exports = express();

const { allowCrossDomain, validateRequest, jwtRequired, passUserFromJWT, adminRequired } = require("../../middlewares");

const { post_cart_items, patch_cart_items, delete_cart_items } = require("./validations");
const { findAll, updateCartItem, deleteCartItem } = require("./cart-items-dal");
const { ErrorHandler } = require("../../utils/error");
const { createCartItem } = require("../cart-items-dal");

app.use(allowCrossDomain)

app.get("/cart_items", async (req,res) => {
    let cart_items = await findAll();
    return res.json({
        code: 200,
        message: "success",
        data: { cart_items }
    })
})

app.post("/cart_items",[
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(post_cart_items)
], async (req,res) => {
    let cart_item = await createCartItem(req.body);
    return res.json({
        code: 200,
        message: "success",
        data: { cart_item }
    })
})

// TODO: Think about it
// app.patch("/cart_items/:cart_item_id", [
//     jwtRequired, passUserFromJWT, adminRequired,
//     validateRequest(patch_cart_items)
// ], async (req,res) => {
//     let cart_item = await updateCartItem({
//         pk: req.params.cart_item_id,
//         data: req.body
//     });
//     return res.json({
//         code: 200,
//         message: "success",
//         data: { cart_item }
//     })
// })

app.delete("/cart_items/:cart_item_id", [
    jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(delete_cart_items)
], async (req,res) => {
    await deleteCartItem(req.params.cart_item_id)
    return res.json({
        code: 204,
        message: "success"
    })
})