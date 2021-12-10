const express = require("express")
const router = express.Router();

const controller = require('../controllers/user')

router.post('/create', controller.createUser)
router.get('/read',controller.getAllUser)
router.get('/read/:id',controller.getByUserId)
router.post('/login', controller.login)


module.exports = router;