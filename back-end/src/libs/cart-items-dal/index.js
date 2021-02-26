
const { CartItem } = require("../../models");

module.exports = {
    findOne: async data => {
        let data_keys = ["CartId", "ProductId"]
        let where = {}
        data_keys.map( key => data[key] ? where[key] = data[key] : null)
        console.log({where})
        return await CartItem.findOne({
            where
        })
    },
    findAllForCart: async ({ CartId }) => await CartItem.findAll({
        where: { CartId }
    }),
    findAllForCartWhere: async (CartId, { where }) => await CartItem.findAll({
        where: { CartId, ...where }
    }),
    findAll: async ({
        CartId, ProductId 
    }) => await CartItem.findAll({ 
        where: { CartId, ProductId }
    }),
    createCartItem: async ({ 
        CartId, ProductId 
     }) => await CartItem.create({ 
        CartId, ProductId 
    }),
    deleteCartItem: async ({
        CartId, CartItemId
    }) => {
        let cart_item = await CartItem.findOne({ where: { CartId, id: CartItemId } });
        await cart_item.destroy();
        return cart_item;
    }
}