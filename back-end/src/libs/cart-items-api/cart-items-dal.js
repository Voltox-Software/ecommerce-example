
const { CartItem } = require("../../models");

module.exports = {
    findAll: async () => await CartItem.findAll(),
    updateCartItem: async ({pk,data}) => {
        let keys = Object.keys(data);
        let cart_item = await CartItem.findByPkOr404(pk);
        for (let key of keys){
            cart_item[key] = data[key]
        }
        await cart_item.save();
        return cart_item;
    },
    deleteCartItem: async (pk) => await (await (await CartItem.findByPkOr404(pk))).destroy()
}