"use strict";
/*************************************************************************
DONATIONS TABLE
*************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, Sequelize) {
    const Donations = sequelize.define("donations", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        beneficiaryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW(),
        },
    }, {
        freezeTableName: true,
    });
    Donations.associate = function (models) {
        models.users.hasMany(models.wallets, {
            onDelete: "cascade",
            targetKey: "id",
            foreignKey: "userId",
        });
    };
    return Donations;
}
exports.default = default_1;
