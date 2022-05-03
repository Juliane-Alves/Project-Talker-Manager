const express = require('express');
const bodyParser = require('body-parser');
const { getTalker,
   talkerId,
   validateAuthorization,
   validateName,
   validateAge,
   validateTalkAnd,
   validateWatcheadAt,
   validateRate,
   validateAddTalker, 
  } = require('./middlwares/middlwareTalker');
const login = require('./middlwares/loginMiddlware');
const validateTalkerId = require('./middlwares/talkerIdMiddlware');
const validateEmailAndPas = require('./middlwares/middlwarevalidlogin');

// const router = express.Router();

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// endpoint do requisito 1 
app.get('/talker', getTalker);

// endpoint requisito 2 
app.get('/talker/:id', talkerId);

// endpoint requisito 3 
app.post('/login', validateEmailAndPas, login);

// endpoint requisito 5
 app.post('/talker', 
 validateAuthorization, 
 validateName, 
 validateAge, 
 validateTalkAnd, 
 validateWatcheadAt,
 validateRate,
 validateAddTalker);

// endpoint requisito 6 
app.put('/talker/:id', validateTalkerId);

app.listen(PORT, () => {
  console.log('Online');
});
