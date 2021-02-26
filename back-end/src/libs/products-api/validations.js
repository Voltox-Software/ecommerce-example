
const yup = require("yup");
const { param_id } = require("../utils/validations");

module.exports = {
    post_products: yup.object().shape({
        requestBody: yup.object().shape({
            name: yup.string().required(),
            price: yup.number().integer().positive().required(),
            picture_url: yup.string().required(),
        })
    }),
    patch_products: yup.object().shape({
        requestBody: yup.object().shape({
            name: yup.string().required(),
            price: yup.number().integer().positive(),
            picture_url: yup.string().required(),
        }),
        params: yup.object().shape({
            product_id: param_id.required()
        })
    }),
    delete_products: yup.object().shape({
        params: yup.object().shape({
            product_id: param_id.required()
        })
    })
}