const mysql = require('mysql2');

async function init({ database, host, multipleStatements, password, port, user }) {
    const connection = mysql.createConnection({
        database,
        host,
        multipleStatements,
        password,
        port,
        user,
    });

    return await new Promise((resolve, reject) => {
        connection.connect(function (error) {
            if (error) return reject(error);
            resolve(connection);
        });
    })
}

exports.init = init;