const fs = require('fs');
const fsTalker = require('../utils/fsTalker');

const STATUS_204 = 204;

const talkerDelete = (req, res) => {
    const { id } = req.params;
  try {
    const fsTalker2 = fsTalker('./talker.json');
    fs.writeFileSync('./talker.json', JSON.stringify([
      ...fsTalker2.filter((talk) => talk.id !== Number(id)),
    ]));
    return res.status(STATUS_204).json();
  } catch (error) {
    console.log(error.massage);
  }
};

module.exports = talkerDelete;