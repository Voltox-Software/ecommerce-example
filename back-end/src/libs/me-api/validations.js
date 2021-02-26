
const yup = require("yup");
const { param } = require("../auth-api");
const { id, param_id } = require("../utils/validations");

let mil_type_schema = yup.number().integer().positive().required()

module.exports = {
    post_carts_add_floor_boxes: yup.object().shape({
        requestBody: yup.object().shape({
            mil_type: mil_type_schema,
            FloorId: id.required(),
            FloorTileSizeId: id.required(),
            boxes_amount: id.required(),
        })
    }),
    post_me_cart_remove_item: yup.object().shape({
        requestBody: yup.object().shape({
            CartFloorItemId: id.required()
        })
    }),
    post_carts_add_product: yup.object().shape({
        params: yup.object().shape({
            product_id: param_id.required()
        })
    })
}