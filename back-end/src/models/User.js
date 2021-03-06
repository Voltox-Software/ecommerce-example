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
    let User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "not-set"
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        oauth_id: {
            type: DataTypes.STRING
        }
    }, options);

    User.associate = models => {

    }
    
    return User;
};