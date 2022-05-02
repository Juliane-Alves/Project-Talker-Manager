const fsTalker = require('../utils/fsTalker');

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;

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

module.exports = {
    getTalker,
    talkerId,
};