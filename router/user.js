const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')

router.post('/register', controller.create)
router.post('/login', controller.login)
router.get('/list', controller.list)
router.delete('/remove', controller.destroy)
router.put('/update', controller.update)
router.put('/change/password', controller.changePassword)

module.exports = router