"use strict"

const { NonNullUniqueString, NonNullString } = require("./common");

module.exports = (sequelize, DataTypes) => {
    let options = { 
        defaultScope: {
            attributes: { exclude: [ "password" ] },
        },
        scopes: {
            withPassword: {
                attributes: {},
            }
        }
    }
    let Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, options);

    Product.associate = models => {

    }
    
    return Product;
};