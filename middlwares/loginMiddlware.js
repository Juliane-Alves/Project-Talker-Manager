const crypto = require('crypto'); // https://nodejs.org/api/crypto.html#crypto;

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;

const login = (req, res, next) => {
  const { email, password } = req.body;
 
  const token = crypto.randomBytes(8).toString('hex');

  if (!email || !password) {
      res.status(NOT_FOUND).json({ message: 'token invalido' });
  }
  next();

  return res.status(HTTP_OK_STATUS).json({ token });
};

module.exports = login;