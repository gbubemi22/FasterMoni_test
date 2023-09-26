"use strict";
/*************************************************************************
USERS TABLE
*************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, Sequelize) {
    const Users = sequelize.define("users", {
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        number: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        donationCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        type: {
            type: Sequelize.ENUM("admin", "user"),
            defaultValue: "user",
        },
        status: {
            type: Sequelize.ENUM("active", "inactive"),
            defaultValue: "inactive",
        },
        verifiedAt: Sequelize.DATE,
    }, {
        freezeTableName: true,
    });
    Users.associate = function (models) {
        models.users.hasOne(models.wallets, {
            onDelete: "cascade",
            targetKey: "id",
            foreignKey: "userId",
        });
        models.users.hasOne(models.pins, {
            onDelete: "cascade",
            targetKey: "id",
            foreignKey: "userId",
        });
        models.users.hasMany(models.donations, {
            onDelete: "cascade",
            targetKey: "id",
            foreignKey: "userId",
        });
    };
    return Users;
}
exports.default = default_1;
