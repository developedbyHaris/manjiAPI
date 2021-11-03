const router     = require('express').Router();
const roleRouter = require('./role');
const userRouter = require('./user');
const kecamatanRouter = require('./kecamatan');
const data_kasusRouter = require('./data_kasus');


router.use('/role', roleRouter),
router.use('/auth', userRouter),
router.use('/kecamatan', kecamatanRouter),
router.use('/data_kasus', data_kasusRouter)

module.exports = router;