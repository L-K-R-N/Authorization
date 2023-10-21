const db = require('../db')

class roleController {

    async setRole(request, response) {
        try {
            const {value} = request.body;
            const newRole = await db.query('INSERT INTO role (value) values ($1) RETURNING *', [value]);
            response.json(newRole.rows[0])

        } catch (e) {
            console.log(e);
            response.json('Такая роль уже существует');
        }
    }
    async getRoles(request, response) {
        try {
            const roles = await db.query('SELECT * FROM role')
            response.json(roles.rows)
        } catch (e) {
            console.log(e)
        }
    }
    async deleteRole(request, response) {
        try {
            const {value} = request.body;
            await db.query('DELETE FROM role where value = $1', [value])
            response.json('Роль была удалена')
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new roleController();
