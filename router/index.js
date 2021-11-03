const router     = require('express').Router();
const roleRouter = require('./role');
const userRouter = require('./user');


router.use('/role', roleRouter),
router.use('/auth', userRouter)

module.exports = router;