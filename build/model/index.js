"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconfig_1 = __importDefault(require("../config/dbconfig"));
const sequelize = new sequelize_1.Sequelize(dbconfig_1.default.db, dbconfig_1.default.user, dbconfig_1.default.password, {
    host: dbconfig_1.default.host,
    dialect: dbconfig_1.default.dialect,
    port: 3306,
    pool: {
        acquire: dbconfig_1.default.pool.acquire,
        min: dbconfig_1.default.pool.min,
        max: dbconfig_1.default.pool.max,
        idle: dbconfig_1.default.pool.idle
    }
});
sequelize.authenticate().then(() => {
    console.log("connected");
})
    .catch((err) => {
    console.log(err);
});
const db = {};
db.Sequelize = sequelize_1.Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({
    force: false
}).then(() => {
    console.log("yes migrated");
});
exports.default = db;
