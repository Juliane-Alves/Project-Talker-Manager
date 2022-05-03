const fs = require('fs');
const fsTalker = require('../utils/fsTalker');

const HTTP_OK_STATUS = 200;

const validateID = (req, res) => {
    const { id } = req.params;
    const content = req.body; 
    try {
       const fsTalker2 = fsTalker('./talker.json');
       const addTalker = { id: +id, ...content };
       fs.writeFileSync('./talker.json', JSON.stringify(
        [...fsTalker2.filter((talker) => talker.id !== +id), addTalker],
        ));
        res.status(HTTP_OK_STATUS).json(addTalker);
      } catch (error) {
        console.log(error.massage);
      }
};

module.exports = validateID;