const uuid = require('uuid');
const db = require("../models/index.js");
const {Op} = require('sequelize');
const get_by_id=async (id)=>{
const data = await db.users.findAll({
    attributes : ['email','password','age'],
    where : {id : id, isDelete : false}
});
return data;
};
const getAutoSuggestUsers = async (emailSubstring, limit)=>{
 let data= await db.users.findAll({
    attributes : ['email'],
    where : {
        email : {
        [Op.iLike] : emailSubstring+'%'
        },
        isDelete : false
    },
    order : [
        ['email', 'ASC']
    ],
    limit : limit
 })
 //console.log(JSON.stringify(data, null, 2));
 return data;
};
const creat_user = async(user)=>{
    user.id=uuid.v4();
 let datas,errors;
  await db.users.create(user).then((data)=>{datas=data}).catch((error)=>{errors=error});
 return datas.toJSON();
};
const update_user = (id, data)=>{
    let flag;
    db.users.update(data,{
        where : {
            id : id,
            isDelete : false
        }
    }).then(() => {flag=1}).catch(() => {flag=0});
    return flag;
};
const delete_user = (id)=>{
    let flag;
    db.users.update({isDelete:true},{
        where : {
            id : id,
            isDelete : false
        }
    }).then(()=>{flag=1}).catch(()=>{flag=0});
    return flag;
};


module.exports = {
    get_by_id,
    getAutoSuggestUsers,
    creat_user,
    update_user,
    delete_user
};
