
const { Cart, CartItem, Product } = require("../../models");
const { ErrorHandler } = require("../../utils/error");
// const { getCartFloorItemWithMoreInfo } = require("./utils");

module.exports = {
    findOne: async ({ id, UserId, discarded,v_charge_id, not_json }) => {
        let where = {}
        if (UserId) where.UserId = UserId
        if (id) where.id = id
        if (discarded) where.discarded = discarded
        if (v_charge_id) where.v_charge_id = v_charge_id
        console.log({where})
        let cart = await Cart.findOne({
            where, include: [ 
                {
                    model: CartItem,
                    include: Product
                }
             ]
        })
        return cart;
    },
    createCart: async ({ 
        UserId
     }) => {
        let where = { discarded: false, v_charge_id: null }
        if (UserId) where.UserId = UserId
        if (
            await Cart.findOne({ where })
        ) throw new ErrorHandler(403, "Discard active cart to create a new one.")
        return await Cart.create({ 
            UserId
        })
    },
    getCartWithAllItems: async ({
        CartId
    }) => {
        let cart = await Cart.findByPkOr404(CartId);
        let cart_items = await CartFloorBox.findAll({
            where: { CartId }, include: CartItem
        })

        let items = {}
        for (let cart_item of cart_items){
            let { ProductId } = cart_item
            if (!items[ProductId]) items[ProductId] = 1
            else items[ProductId]++;
        }
        console.log(items)
        return cart;
    }
}