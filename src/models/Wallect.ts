/*************************************************************************
import default from '../DB/config';
Wallet TABLE
*************************************************************************/



export default function (sequelize: any, DataTypes: any) {
     const Wallets = sequelize.define(
       "wallets",
       {
         balance: {
           type: DataTypes.FLOAT,
           defaultValue: 0.00,
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
           defaultValue: 'NGN',
         },
       },
       {
         freezeTableName: true,
       }
     );

     Wallets.associate = function (models: any) {
		models.wallets.belongsTo(models.users, { onDelete: 'cascade', targetKey: 'id', foreignKey: 'userId' });
	};
   
     return Wallets; 
   }
   