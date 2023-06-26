import { buffer } from "micro";
import { mongooseConnect } from "@/libs/mongoose";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_959bfcab2ddd7632de95e52b58ee8087d21df3dcbf5d127121478f3c07b391aa";

export const config = {
  api: { bodyParser: false },
};

const handler = async (req, res) => {
  await mongooseConnect();

  // Code from Stripe test in a local environment
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      // We use the micro library's buffer function to buffer the request body for verification.
      await buffer(req),
      sig,
      endpointSecret,
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      // console.log(data);
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;

    // ... handle other event types
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      console.log(paymentIntentSucceeded);
      break;

    case "payment_intent.payment_failed":
      // Handle failed payment intent event
      console.log("Payment failed:", event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send("ok");
};

export default handler;

// acct_1NLevfJYeUspqSvj
// whsec_959bfcab2ddd7632de95e52b58ee8087d21df3dcbf5d127121478f3c07b391aa
