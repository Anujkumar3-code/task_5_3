
const user_model = (sequelize,DataTypes)=>{
    const user = sequelize.define('user',{
        id :{
            type : DataTypes.UUID,
            primaryKey : true
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        age : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        isDelete : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }
    });
    return user;
};
module.exports = user_model;