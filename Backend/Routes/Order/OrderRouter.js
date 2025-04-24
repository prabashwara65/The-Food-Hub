const express = require('express')

const router = express.Router()

const {
    getAllOrders,
    getOrderById,
    PostOrder,
} = require('../../Controller/Order/OrderController')

router.get('/getOrders' , getAllOrders)

router.get('/getOrder/:id' , getOrderById)

router.post('/create' , PostOrder)

module.exports = router;