
const { Product } = require("../../models");

module.exports = {
    findAll: async () => await Product.findAll(),
    createProduct: async ({ name, price, picture_url }) => await Product.create({ name, price, picture_url }),
    updateProduct: async ({pk,data}) => {
        let keys = Object.keys(data);
        let product = await Product.findByPkOr404(pk);
        for (let key of keys){
            product[key] = data[key]
        }
        await product.save();
        return product;
    },
    deleteProduct: async (pk) => await (await (await Product.findByPkOr404(pk))).destroy()
}