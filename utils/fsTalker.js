const fs = require('fs');

const talkerJson = (arq) => JSON.parse(fs.readFileSync(arq, 'utf8'));

module.exports = talkerJson;

// função para arquivo ler o Json; 