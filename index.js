const express = require('express');
const bodyParser = require('body-parser');
const { getTalker, talkerId } = require('./middlwares/middlwareTalker');
const login = require('./middlwares/loginMiddlware');

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
app.post('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
