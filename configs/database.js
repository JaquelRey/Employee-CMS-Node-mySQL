module.exports = {
    mysql: {
        database: "employees",
        host: "localhost",
        multipleStatements: true,
        password: "Torture",
        port: 3306,
        user: "root",
    },
    sqlite: {
        databaseFile: "employees.db",
        options: {
            verbose: msg => console.log('sqlite:', msg)
        }
    }
}