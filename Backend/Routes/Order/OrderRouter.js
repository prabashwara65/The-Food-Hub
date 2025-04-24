const express = require('express')

const router = express.Router()

const {
    getAllOrders,
    getOrderById,
    PostOrder,
} = require('../../Controller/Order/OrderController')

router.get('/' , getAllOrders)

router.get('/:id' , getOrderById)

router.post('/' , PostOrder)