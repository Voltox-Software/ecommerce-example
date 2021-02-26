
const yup = require("yup");
const { param_id, id } = require("../utils/validations");

module.exports = {
    post_cart_items: yup.object().shape({
        requestBody: yup.object().shape({
            CartId: id.required(), 
            ProductId: id.required(), 
        })
    }),
    patch_cart_items: yup.object().shape({
        requestBody: yup.object().shape({ 
            CartId: id, 
            ProductId: id,
        }),
        params: yup.object().shape({
            cart_item_id: param_id.required()
        })
    }),
    delete_cart_items: yup.object().shape({
        params: yup.object().shape({
            cart_item_id: param_id.required()
        })
    })
}