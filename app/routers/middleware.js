const Joi = require('joi');
const userPostValidation = (req, res, next) => {
    const Validation = Joi.object().keys({
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow : ['com', 'net'] } }).required(),
        password : Joi.string().alphanum().required(),
        age : Joi.number().integer().min(4).max(130).required()
    });
    const { error } = Validation.validate(req.body);
    if (error) {
        res.status(400).send({ error });
    } else {
        return next();
    }
};

const userPutValidation = (req, res, next) => {
    const Validation = Joi.object().keys({
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow : ['com', 'net'] } }),
        password : Joi.string().alphanum(),
        age : Joi.number().integer().min(4).max(130)
    });
    const { error } = Validation.validate(req.body);
    if (error) {
        res.status(400).send({ error });
    } else {
        return next();
    }
};

module.exports = {
    userPostValidation,
    userPutValidation
};
