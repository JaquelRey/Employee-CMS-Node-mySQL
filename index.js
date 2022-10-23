const logo = require('asciiart-logo');
//require('console.table');

const database = require('./database');
//const queries = require('./queries')

const { toEnum } = require('./utils');

const routes = require('./routes');

(async function () {
    const db = await database.connect({ verbose: false });
    const commands = new routes({
        controllers: {},
        utils: {
            toEnum
        }
    });

    console.log(logo({ name: 'Employee Manager' }).render());
    while (true) {
        await commands.display();
    }
}());