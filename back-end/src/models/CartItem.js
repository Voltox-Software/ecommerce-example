"use strict"

const { ErrorHandler } = require("../utils/error");

module.exports = (sequelize, DataTypes) => {
    let options = {
        defaultScope: { }
    }
    
    let CartItem = sequelize.define('CartItem', {
        status: {
            type: DataTypes.ENUM("ACTIVE","REMOVED"),
            allowNull: false,
            defaultValue: "ACTIVE"
        },
    }, options);

    CartItem.associate = models => {
        CartItem.belongsTo(models.Cart, { foreignKey: { allowNull: false, primaryKey: true } })
        CartItem.belongsTo(models.Product, { foreignKey: { allowNull: false, primaryKey: true } })
    }
    
    return CartItem;
};