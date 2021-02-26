"use strict"

const { ErrorHandler } = require("../utils/error");

module.exports = (sequelize, DataTypes) => {
    let options = {
        defaultScope: { 
            include: { all: true },
            where: { discarded: false }
        }
    }
    let Cart = sequelize.define('Cart', {
        discarded: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        v_charge_id: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.VIRTUAL,
            set: function(val) {
                let discarded = this.getDataValue("discarded");
                if (discarded) return "DISCARDED";
                let v_charge_id = this.getDataValue("v_charge_id");
                if (v_charge_id) return "PURCHASED"
                return "ACTIVE"
            }
        }
    }, options);

    Cart.associate = models => {
        Cart.belongsTo(models.User, { foreignKey: { allowNull: false } })
        Cart.hasMany(models.CartItem, { foreignKey: { allowNull: false } })
    }
    
    return Cart;
};