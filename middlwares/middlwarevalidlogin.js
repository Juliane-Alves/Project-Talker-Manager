const validadeEmail = require('../utils/validate');

const INVALID_STATUS = 400;

const validateEmailAndPass = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(INVALID_STATUS).json({ message: 'O campo "email" é obrigatório' });
       }
       const validateEmail2 = validadeEmail(email);
       if (!validateEmail2) {
        return res.status(INVALID_STATUS).json(
            { message: 'O "email" deve ter o formato "email@email.com"' },
           );
       } if (!password) {
         return res.status(INVALID_STATUS).json({ message: 'O campo "password" é obrigatório' });
       } if (password.length < 6) {
         return res.status(INVALID_STATUS).json(
             { message: 'O "password" deve ter pelo menos 6 caracteres' },
        );
       } 
   next();
};

module.exports = validateEmailAndPass;