"use strict";
/*************************************************************************
import default from '../DB/config';
Pin TABLE
*************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    const Pins = sequelize.define("pins", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pin: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    });
    Pins.associate = function (models) {
        models.pins.belongsTo(models.users, {
            onDelete: "cascade",
            targetKey: "id",
            foreignKey: "userId",
        });
    };
    return Pins;
}
exports.default = default_1;
