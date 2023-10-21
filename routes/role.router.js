const Router = require('express');
const router = new Router();
const controller = require('../controller/role.controller');

router.post('/setRole', controller.setRole);
router.get('/getRoles', controller.getRoles);
router.delete('/deleteRole', controller.deleteRole);

module.exports = router;