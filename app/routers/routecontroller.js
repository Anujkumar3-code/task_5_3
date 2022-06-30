
const express = require('express');
const router = express.Router();
const {userPostValidation,userPutValidation} = require('./middleware');
const {get,getUserList,post,put,deletes,anything} = require('../services/main_logic.js');


router.get('/get/id/:id', get);
router.get('/get/autosuggest/:emailsubstring', getUserList);
router.post('/post', userPostValidation, post);
router.put('/put/:id', userPutValidation, put);
router.delete('/delete/:id', deletes);
router.use('/*', anything);


module.exports = {
    router
};
