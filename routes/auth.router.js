const Router = require('express');
const controller = require('../controller/auth.controller')
const router = new Router();

const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')
const {check} = require('express-validator');

router.post('/registration', [
    check("username", "Имя должно быть длиннее 3-ёх символов, но короче 15-ти").trim().isLength({min: 3, max: 15}),
    check("password", "Пароль должен быть длиннее 3-ёх символов, но короче 15-ти").trim().isLength({min: 3, max: 15})

], controller.registration);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['USER']), controller.getUsers);


module.exports = router;