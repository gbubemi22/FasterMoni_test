/*************************************************************************
import default from '../DB/config';
Pin TABLE
*************************************************************************/

export default function (sequelize: any, DataTypes: any) {
  const Pins = sequelize.define(
    "pins",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      pin: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
      },
    },

    {
      freezeTableName: true,
    }
  );

  Pins.associate = function (models: any) {
    models.pins.belongsTo(models.users, {
      onDelete: "cascade",
      targetKey: "id",
      foreignKey: "userId",
    });
  };
  return Pins;
}
