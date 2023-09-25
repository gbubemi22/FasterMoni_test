/*************************************************************************
DONATIONS TABLE
*************************************************************************/

export default function (sequelize: any, Sequelize: any) {
  const Donations = sequelize.define(
    "donations",
    {
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
    },
    {
      freezeTableName: true,
    }
  );

  Donations.associate = function (models: any) {
    models.users.hasMany(models.wallets, {
      onDelete: "cascade",
      targetKey: "id",
      foreignKey: "userId",
    });
  };
  return Donations;
}
