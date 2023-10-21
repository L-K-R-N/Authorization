const db = require('../db')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, secret, {expiresIn: "1h"})
}

class authController {
    async registration(request, response) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({message: 'Ошибка регистрации', errors});
            }
            const {username, password} = request.body;
            const candidate = await db.query('SELECT * FROM person where username = $1', [username]);
            if (candidate.rows.length) {
                return response.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            const role = await db.query('SELECT * FROM role where value = $1', ['USER'])
            await db.query('INSERT INTO person (username, password, roles) values ($1, $2, $3)', [username, hashPassword, [role.rows[0].value]])
            // console.log(candidate.rows.length)
            response.json({message: 'Пользователь успешно зарегистрирован'})
            // response.json(candidate.rows.length)
        } catch(e) {
            console.log(e);
            response.status(400).json({message: 'registration error'})
        }
    }

    async login(request, response) {
        try {
            const {username, password} = request.body;
            const user = await db.query('SELECT * FROM person where username = $1', [username]);
            if (!user.rows.length) {
                return response.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.rows[0].password);
            if (!validPassword) {
                return response.status(400).json({message: 'Введен неверный пароль'})
            }
            const token = generateAccessToken(user.rows[0].id, user.rows[0].roles);
            response.json({token})
        } catch(e) {
            console.log(e);
            response.status(400).json({message: 'login error'})
        }
    }

    async getUsers(request, response) {
        try {
            const users = await db.query('SELECT * FROM person');
            response.json(users.rows);
        } catch(e) {
            console.log(e);
        }
    }

    
}

module.exports = new authController();