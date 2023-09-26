"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.default = {
    host: process.env.HOST,
    user: 'fastmoni',
    password: 'StrongP@ssw0rd123',
    database: process.env.DATABASE || 'fastmoni',
    dialect: 'mysql',
    port: process.env.DB_PORT
};
// import { Sequelize } from 'sequelize';
// const sequelize = new Sequelize('apex', 'fastmoni', 'StrongP@ssw0rd123', {
//      host: 'localhost',
//      dialect: 'mysql',
//      port: 3306,
//      pool: {
//           max: 10,
//           min: 0,
//           acquire: 30000,
//           idle: 10000
//      }
// });
// // sync the database tables
// sequelize.sync().then(() => {
//      console.log('Database tables synced');
//    }).catch((error) => {
//      console.error('Unable to sync database tables:', error);
//    });
// //Test the connection
// (async () => {
//      try {
//           await sequelize.authenticate();
//           console.log('Connection has been established');
//      } catch (error) {
//           console.log('Unable to connect to the database:', error);
//      }
// })();
// export default sequelize;
