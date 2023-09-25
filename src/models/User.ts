

/*************************************************************************
USERS TABLE
*************************************************************************/

export default function (sequelize: any, Sequelize: any) {
  const Users = sequelize.define(
    "users",
    {
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

      type: {
        type: Sequelize.ENUM("admin", "user"),
        defaultValue: "user",
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "inactive",
      },
      verifiedAt: Sequelize.DATE,
    },
    {
      freezeTableName: true,
    }
  );

  Users.associate = function (models: any) {

  models.users.hasOne(models.wallets, { onDelete: 'cascade', targetKey: 'id', foreignKey: 'userId' });
  }
  return Users;
}

