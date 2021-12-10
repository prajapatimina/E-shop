const express = require("express")
const router = express.Router()

const controller = require("../controllers/category")

router.post('/create', controller.createCategory)
router.get('/read',controller.getAllCategory)
router.get('/read/:id', controller.getByCategoryId)
router.put('/update/:id',controller.updateCategory)
router.delete('/remove/:id',controller.delete)

module.exports = router;