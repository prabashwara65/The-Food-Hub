const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req,res) => {
    const { items, email } = req.body;
    // console.log("Received items:", items);

    try{
        const line_items= items.map (item => ({
            price_data:{
                currency: "lkr",
                product_data: {
                    name: item.menuTitle,
                    images : [item.menuImage || ""]
                },
                unit_amount: Math.round(item.menuPrice*100)  ,          
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            customer_email: email,
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'LK'], 
            },

        });



        res.json({id : session.id});

    }catch (error){

        console.error ("Stripe checkout error", error);
        res.status(500).json({error: "Failed to create Stripe session"});

    }
}

module.exports = {createCheckoutSession}