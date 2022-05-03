const crypto = require('crypto'); // https://nodejs.org/api/crypto.html#crypto;
const validadeEmail = require('../utils/validate');

const HTTP_OK_STATUS = 200;
// const NOT_FOUND = 404;
const INVALID_STATUS = 400;

// if (!email || !password) {
 // res.status(NOT_FOUND).json({ message: 'token invalido' });
// primeira validação retirada do req 3, lint não permite arrow function tão grande;
const login = (req, res, next) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  if (!email) {
   res.status(INVALID_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  const validateEmail2 = validadeEmail(email);
  if (!validateEmail2) {
   res.status(INVALID_STATUS).json(
       { message: 'O "email" deve ter o formato "email@email.com"' },
      );
  } if (!password) {
    res.status(INVALID_STATUS).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
     res.status(INVALID_STATUS).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();

  return res.status(HTTP_OK_STATUS).json({ token });
};

module.exports = login;