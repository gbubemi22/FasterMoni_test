"use strict";
/*************************************************************************
import default from '../DB/config';
Wallet TABLE
*************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    const Wallets = sequelize.define("wallets", {
        balance: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        walletName: {
            type: DataTypes.STRING,
        },
        currency: {
            type: DataTypes.STRING,
            defaultValue: "NGN",
        },
    }, {
        freezeTableName: true,
    });
    Wallets.associate = function (models) {
        models.wallets.belongsTo(models.users, {
            onDelete: "cascade",
            targetKey: "id",
            foreignKey: "userId",
        });
    };
    return Wallets;
}
exports.default = default_1;
