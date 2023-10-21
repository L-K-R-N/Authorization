const express = require('express');
const authRouter = require('./routes/auth.router');
const roleRouter = require('./routes/role.router')
const app = express();

const PORT = 1704;

app.use(express.json());

app.use('/auth', authRouter);
app.use('/role', roleRouter);

const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()