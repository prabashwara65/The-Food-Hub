

--Auth Service-- 4001
app.use('/api/auth' , UserRouter)
app.use("/api/owner", OwnerRoutes);


--Payment Service-- 4000
app.use('/api/cart', CartRouter)
app.use('/api/checkout', CheckoutRouter)
// ⚠️ Stripe requires the raw body for webhook signature verification
app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);


--Delivery Service-- 4002
app.use('api/deliver' , deliverRoute)
app.use('/api', deliveryRoutes);
app.use('/api/drivers', driverRoutes);


--Order Service--
app.use('/api/order' , OrderRouter)



--Restuarant Service--
app.use("/api/restaurant", RestaurantRouter);
app.use('/api/menu', MenuRouter)
app.use('/api/restaurantView', SearchRestaurantRouter)


--Notification Service--
app.use('/api', emailRoutes);

