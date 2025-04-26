require('dotenv').config()


const express = require('express')
const { mongoose } = require('mongoose')
const cors = require('cors')

const  UserRouter  = require('./Routes/UserAuth/UserRouter')
const MenuRouter = require('./Routes/Menu/MenuRouter')
const SearchRestaurantRouter = require('./Routes/RestaurantView/SearchRestaurantRoute')
const CartRouter = require('./Routes/Cart/CartRoute')
const OrderRouter = require('./Routes/Order/OrderRouter')


const app = express()

//middleware
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));


app.use('/api/auth' , UserRouter)
app.use('/api/menu', MenuRouter)
app.use('/api/restaurantView', SearchRestaurantRouter)
app.use('/api/cart', CartRouter)
app.use('/api/order' , OrderRouter)



//delivery
const deliveryRoutes = require('./Routes/delivery/deliveryRoutes');
app.use('/api', deliveryRoutes);

const driverRoutes = require('./Routes/delivery/driverRoutes');
app.use('/api/drivers', driverRoutes);

const emailRoutes = require('./Routes/delivery/emailRoutes');
app.use('/api', emailRoutes);


mongoose.connect(process.env.DB)
.then(()=> {
    app.listen(process.env.PORT , () => {
        console.log("Server is running on Port " + process.env.PORT)
    })
}).catch((error => {
    console.log(error)
})) 

