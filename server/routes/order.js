const express = require("express")
const router = express.Router();

const controller = require('../controllers/order');
const { isLoggedin } = require("../middlewares/auth");

router.post('/create',isLoggedin, controller.createOrder)
router.get('/read',controller.getAllOrder)
router.get('/read/:id',controller.getOrderById)
router.put('/update/:id', controller.updateOrder)
router.delete('/remove/:id',controller.deleteOrder)
router.get('/userOrder/:userId',controller.getUserOrder)

module.exports = router;