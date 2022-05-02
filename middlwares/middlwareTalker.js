const fsTalker = require('../utils/fsTalker');

const HTTP_OK_STATUS = 200;

const getTalker = (req, res) => {
    const fsTalker2 = fsTalker('./talker.json');
    return res.status(HTTP_OK_STATUS).json(fsTalker2);
};

module.exports = getTalker;