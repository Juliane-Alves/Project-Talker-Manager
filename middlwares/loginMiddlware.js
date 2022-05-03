 const crypto = require('crypto'); // https://nodejs.org/api/crypto.html#crypto;

 const HTTP_OK_STATUS = 200;
// const NOT_FOUND = 404;

// if (!email || !password) {
 // res.status(NOT_FOUND).json({ message: 'token invalido' });
// primeira validação retirada do req 3, lint não permite arrow function tão grande;
const login = (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
   res.set('token', token);
   res.status(HTTP_OK_STATUS).json({ token });
};

module.exports = login;