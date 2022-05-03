const fs = require('fs'); 
const fsTalker = require('../utils/fsTalker');

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const ERROR_STATUS = 401;
const SUCESS_STATUS = 201;
const BAD_REQUEST = 400;

const getTalker = (req, res) => {
    const fsTalker2 = fsTalker('./talker.json');
    return res.status(HTTP_OK_STATUS).json(fsTalker2);
};

const talkerId = (req, res) => {
    const { id } = req.params;
    const fsTalker2 = fsTalker('./talker.json');
    const filterTalkerId = fsTalker2.find((talkId) => Number(talkId.id) === Number(id));

    if (!filterTalkerId) {
        return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(filterTalkerId);
};

// Aqui começa as validações do requisito 5 
const validateAuthorization = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) { 
     return res.status(ERROR_STATUS).json({ message: 'Token não encontrado' });
    }
    if (authorization.length < 16) {
      return res.status(ERROR_STATUS).json({ message: 'Token inválido' });
    }
    next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
   const { age } = req.body;
   if (!age || age === '') {
      return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
   }
   if (age < 18) {
   return res.status(BAD_REQUEST).json({ message: 'A pessoa palestrante deve ser maior de idade' });
   }
   next();
};

const validateTalkAnd = (req, res, next) => {
    const { talk } = req.body; 
    if (!talk || !talk.watchedAt || talk.rate === undefined) {
      return res.status(BAD_REQUEST).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
        );  
    }
    next();
};

const validateWatcheadAt = (req, res, next) => {
    const { talk } = req.body;
    const date = /^(0[1-9]|[1-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/(19[8-9]\d|20[0-2]\d)$/;
    if (!talk.watchedAt.match(date)) {
      return res.status(BAD_REQUEST).json(
          { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
          ); 
    }
    next();
};

const validateRate = (req, res, next) => {
    const { talk } = req.body;
    if (talk.rate < 1 || talk.rate > 5) {
     return res.status(BAD_REQUEST).json(
         { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
         );
    }
    next();
};

 const validateAddTalker = (req, res) => {
    const content = req.body;
    try {
      const fsTalker2 = fsTalker('./talker.json');
      content.id = fsTalker2.length + 1;  
      fs.writeFileSync('./talker.json', JSON.stringify([...fsTalker2, content]));
      return res.status(SUCESS_STATUS).json(content);
      } catch (error) {
        console.log(error.message);
      }
};

module.exports = {
    getTalker,
    talkerId,
    validateAuthorization,
    validateName,
    validateAge,
    validateTalkAnd,
    validateWatcheadAt,
    validateRate,
    validateAddTalker,
};