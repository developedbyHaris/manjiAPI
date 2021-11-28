const express = require('express')
const router = express.Router()
const controller = require('../controllers/data_kasus')

router.get('/list', controller.list)
router.post('/find', controller.find)
router.post('/store', controller.create)
router.put('/update', controller.update)
router.delete('/remove', controller.destroy)
router.post('/list/by/kecamatan', controller.listbygroup)
router.post('/group/by/totalkasus', controller.countbygroup)

module.exports = router