const sqlite = require('better-sqlite3');

function init({ databaseFile, options }) {
    return new sqlite(databaseFile, options);
}

exports.init = init;