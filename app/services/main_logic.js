
const { getAutoSuggestUsers, get_by_id, creat_user, update_user, delete_user } = require('../data_access/data_manipulation');

// below function will return the users details for specific id.
const get = async(req, res) => {
    const id = req.params.id;
    let datas,errors; 
    res.setHeader('Content-Type', 'application/json');
    await get_by_id(id).then((data)=>{datas=data;}).catch((error)=>(errors=error));
    if (datas !== null) {
        res.statusCode = 201;
        res.send(datas);
    } else {
        res.statusCode = 404;
        res.send({ message: 'Unable to find the user' });
    }
};
// below function will return the users list based on the emailsubstring.
const getUserList = async (req, res) => {
    const emailSubstring = req.params.emailsubstring;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    let datas,errors;
    await getAutoSuggestUsers(emailSubstring, 10).then((data)=>{datas=data}).catch((error)=>{errors=error});
   
    if( errors){
        res.statusCode=404;
        res.send({message: 'not found'});
    }
    res.send(datas);
};
// create the user and add the details in the data set.
const post = async(req, res) => {
    const user = req.body;
    let users ;
     await creat_user(user).then((data)=>{users=data}).catch((error)=>{});
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 201;
    res.send(users);
    // });
};
// update user detail in the data set.
const put = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const flag = update_user(id, data);
    if (flag == 0) {
        res.statusCode = 404;
        res.send({ message:'unable to update the data' });
    } else {
        res.statusCode = 204;
        res.send({message : 'updated successfully'});
    }
};
// soft delete of the user for the specific id.
const deletes = (req, res) => {
    const id = req.params.id;
    let flag =delete_user(id);
    if (flag == 1) {
        // console.log(flag);
        res.statusCode = 200;
        res.send({ message: 'Successfully Deleted some data' });
    } else {
        res.statusCode = 404;
        res.send({ message: 'Unable to find the user' });
    }
};
const anything = () => {
    throw 'unable to process';
};

module.exports = {
    get,
    getUserList,
    post,
    put,
    deletes,
    anything
}






// // this function will return some emails based on the email substring and limit.
// function getAutoSuggestUsers(emailSubstring, limit) {
//     const userslist = [];
//     const data = users.filter((user) => {
//         return user.isDeleted === false;
//     });
//     for (let i = 0; i < data.length; i++) {
//         const email = data[i].email;
//         // console.log(email);
//         if (email.startsWith(emailSubstring))userslist.push(email);
//     }
//     userslist.sort((a, b) => {
//         a = a.toLowerCase();
//         b = b.toLowerCase();
//         if (a < b) return -1;
//         if (a > b) return 1;
//         return 0;
//     });
//     return userslist.slice(0, limit);
// }

// const get_by_id = (id) => {
//     const data = users.filter((user) => {
//         return user.isDeleted === false;
//     });
//     const position = data.findIndex((user) => user.id === id);
//     if (position === -1) {
//         return { undefined, position };
//     }
//     return { data:data[position], position };
// };


// const creat_user = (userAsJSON) => {
//     userAsJSON.id = uuid.v4();
//     userAsJSON.isDeleted = false;
//     // console.log(userAsJSON);
//     users.push(userAsJSON);
//     return users;
// };
// const update_user = (id, data) => {
//     const userAsJSON = data;
//     const position = users.findIndex((user) => user.id === id);
//     let flag = 1;
//     if (position !== -1 && users[position].isDeleted === false) {
//         Object.entries(userAsJSON).map(entry => {
//             const key = entry[0];
//             const value = entry[1];
//             if (key in users[position]) {
//                 users[position][key] = value;
//             } else {
//                 flag = 0;
//             }
//         });
//     }
//     if (position === -1 || flag === 0) return 0;
//     return 1;
// };
// const delete_user = (id) => {
//     const position = users.findIndex((user) => user.id === id);
//     if (position !== -1 && users[position].isDeleted === false) {
//         users[position].isDeleted = true;
//         return 1;
//     }

//     return 0;
// };
// module.exports = {
//     getAutoSuggestUsers,
//     get_by_id,
//     creat_user,
//     update_user,
//     delete_user
// };
