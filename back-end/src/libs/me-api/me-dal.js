
// const { getFloorBoxesInfo } = require("../floor-boxes-dal");
const { ErrorHandler } = require("../../utils/error");
// const { findAll: findAllCartFloorBoxes } = require("../cart-floor-boxes-dal");
const { 
    // Floor, 
    // FloorTileSize, 
    // FloorBox, 
    // Invoice, 
    // Order, 
    Cart, 
    CartItem, 
} = require("../../models");
// const { findOne: findOneCartItem, deleteCartItem, findAllForCartWhere } = require("../cart-items-dal");
// const { createCartItem, findAllForCart: findAllForCartCartItems } = require("../cart-items-dal");
const { getUserActiveCart } = require("../me-dal");
const uuid = require("uuid");
const { findOne: findOneCart } = require("../carts-dal");


const getTotalPrice = async ({cart_floor_items}) => {
    let price = 0;
    // for (let cart_floor_item of cart_floor_items){
    //     let { FloorTileSizeId, FloorId, mil_type, boxes_amount } = cart_floor_item;
    //     let floor_box = await FloorBox.findOne({ where: { 
    //         FloorTileSizeId, FloorId, mil_type
    //     }})
    //     if (!floor_box) return 0
    //     price += floor_box.price * boxes_amount
    // }
    return price;
}

module.exports = {
    discardCart: async UserId => {
        let cart = await getUserActiveCart({ UserId, not_json: true })
        cart.discarded = true
        await cart.save();
        return cart;
    },
    addProductToCart: async ({ UserId, ProductId }) => {
        let cart = await getUserActiveCart({ UserId, not_json: true });
        let cart_item = await CartItem.create({
            ProductId, CartId: cart.id
        })
        return await getUserActiveCart({ UserId, not_json: true });
    }
    // getMyCartItemsInfo,
    // removeBoxesFromCart: async ({
    //     UserId, mil_type, boxes_amount, FloorTileSizeId, FloorId 
    // }) => {
    //     let cart = await getUserActiveCart({ UserId });
    //     let { id: CartId } = cart
    //     let info = awai({
    //         UserId, CartId, mil_type, boxes_amount, FloorTileSizeId, FloorId, cart
    //     })
    //     if (info === false) throw new ErrorHandler(403, "No item of this type to be managed.")
    //     return info
    // },
    // removeItemFromCart: async ({
    //     UserId, CartItemId
    // }) => {
    //     let { id: CartId } = await getUserActiveCart({ UserId });
    //     await deleteCartItem({ CartId, CartItemId })
    //     return await getUserActiveCart({ UserId });
    // },
    // checkoutMyCart: async ({
    //     UserId
    // }) => {
    //     let cart_floor_items = await getMyCartItemsInfo({ UserId })
    //     if (!cart_floor_items.length) throw new ErrorHandler(403, "EmptyCart", [
    //         "No items in cart to procceed with checkout."
    //     ])
    //     let CartId = cart_floor_items[0].CartId
    //     let some_not_available_check = cart_floor_items.find(x => !x.in_stock);
    //     if (some_not_available_check) throw new ErrorHandler(403, "Not in stock", [ "Some items are not available anymore" ])
    //     for (let cart_floor_item of cart_floor_items){
    //         let { FloorTileSizeId, FloorId, mil_type, boxes_amount } = cart_floor_item;
    //         await FloorBox.update({ CartItemId: cart_floor_item.id}, {
    //             where: {
    //                 FloorTileSizeId, FloorId, mil_type,
    //                 CartItemId: null
    //             },
    //             limit: boxes_amount
    //         })
    //     }
    //     let invoice = await Invoice.create({
    //         check_id: uuid.v4(),
    //         last_four_digits: "4444",
    //         price: await getTotalPrice({ cart_floor_items }),
    //         receipt_url: uuid.v4(),
    //         UserId
    //     })
    //     let order = await Order.create({
    //         UserId, CartId,
    //         InvoiceId: invoice.id
    //     })
    //     await Cart.update({ status: "COMPLETED" }, { where: { id: CartId }})
    //     return order;
    // },
    // findOrder: async ({
    //     UserId, OrderId
    // }) => {
    //     let order = await Order.findOne({
    //         where: {
    //             id: OrderId, UserId
    //         }
    //     })
    //     order = JSON.parse(JSON.stringify(order));
    //     order.Cart = await findOneCart({ id: order.CartId })
    //     return JSON.parse(JSON.stringify(order));
    // },
    // cancelOrder: async ({
    //     UserId, OrderId
    // }) => {
    //     let order = await Order.findOne({
    //         where: {
    //             id: OrderId, UserId
    //         }
    //     })
    //     if (!order) throw new ErrorHandler(404,"Order not found",[
    //         "Order not found"
    //     ])
    //     order.status = "CANCELED";
    //     await order.save();
    //     return order;
    // }
}