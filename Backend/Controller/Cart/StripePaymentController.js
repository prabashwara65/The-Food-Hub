const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const Order = require("../../Model/Order/OrderModel")

const createCheckoutSession = async (req,res) => {
    const { items, email } = req.body;
 

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
            metadata:{
                items: JSON.stringify(items),
            },
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


const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        try {
            const items = session.metadata?.items
                ? JSON.parse(session.metadata.items)
                : [];

            const totalAmount = session.amount_total / 100 || 0;
            const email = session.customer_email || 'no-email@example.com';

            const order = new Order({
                email,
                amount: totalAmount,
                items,
                paymentStatus: session.payment_status || 'unknown',
            });

            await order.save();
            console.log("✅ Order created:", order);
        } catch (err) {
            console.error("❌ Failed to save order:", err.message);
            return res.status(500).send("Order creation failed.");
        }
    }

    res.status(200).json({ received: true });
};


module.exports = {createCheckoutSession, handleStripeWebhook}