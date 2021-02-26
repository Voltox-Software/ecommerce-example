if (global.docs_collector) docs_collector.generalAddYAML(__dirname + "/docs.yaml")

const express = require("express");
const app = module.exports = express();

const { allowCrossDomain, validateRequest, jwtRequired, passUserFromJWT, adminRequired } = require("../../middlewares");

const { post_products, patch_products, delete_products } = require("./validations");
const { findAll, createProduct, updateProduct, deleteProduct } = require("./products-dal");
const { ErrorHandler } = require("../../utils/error");

app.use(allowCrossDomain)

app.get("/products", async (req,res) => {
    let products = await findAll();
    return res.json({
        code: 200,
        message: "success",
        data: { products }
    })
})

app.post("/products",[
    // jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(post_products)
], async (req,res) => {
    let floor_type = await createProduct(req.body);
    return res.json({
        code: 200,
        message: "success",
        data: { floor_type }
    })
})

app.patch("/products/:product_id", [
    // jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(patch_products)
], async (req,res) => {
    let floor_type = await updateProduct({
        pk: req.params.product_id,
        data: req.body
    });
    return res.json({
        code: 200,
        message: "success",
        data: { floor_type }
    })
})

app.delete("/products/:product_id", [
    // jwtRequired, passUserFromJWT, adminRequired,
    validateRequest(delete_products)
], async (req,res) => {
    await deleteProduct(req.params.product_id)
    return res.json({
        code: 204,
        message: "success"
    })
})