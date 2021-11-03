const express = require('express')
const router = express.Router()
const controller = require('../controllers/role')

router.get('/list', controller.list)
router.post('/find', controller.find)
router.post('/store', controller.create)
router.put('/update', controller.update)
router.delete('/remove', controller.destroy)

module.exports = router