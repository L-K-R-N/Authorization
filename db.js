const Pool = require('pg').Pool;

const pool = new Pool( {
    user: "Имя пользователя postges",
    password: "Пароль пользователя postgres",
    host: "localhost",
    port: 5432,
    database: "Название базы данных"
})

module.exports = pool;