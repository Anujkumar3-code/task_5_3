const dbConfig = require("../config/db.config.js");
const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
    port : dbConfig.port,
    logging : false
});

const db = {};
db.sequelize = sequelize;
db.DataTypes = DataTypes;
db.users = require('./user_model.js')(sequelize,DataTypes);
module.exports = db;
