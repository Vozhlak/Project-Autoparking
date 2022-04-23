const Router = require('express');
const router = new Router();
const userRouter = require('../routes/user.routes');

router.use('/user', userRouter);

module.exports = router;