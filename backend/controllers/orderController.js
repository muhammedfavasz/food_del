import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173/";
  try {
    const { userId, items, amount, address } = req.body;
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      status: "Pending", // Set status as pending until payment is verified
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe takes price in cents, so multiplying by 100
      },
      quantity: item.quantity,
    }));

    // Add delivery charges as a separate line item
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "delivery charges",
        },
        unit_amount: 2 * 100, // Assuming 2 INR as delivery charges, modify as needed
      },
      quantity: 1, // Set quantity to 1 for delivery charges
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url }); // Correct field for session URL
  } catch (error) {
    console.error("Error creating Stripe order:", error);
    res
      .status(500)
      .json({ success: false, message: "Order creation failed", error });
  }
};

// COD Order Handler
// COD Order Handler
const codOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      payment: false, // Payment will be done on delivery
      status: "Pending Payment", // Status will remain pending until delivered and paid
    });

    await newOrder.save();

    // Clear cart after successful COD order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully (COD)" });
  } catch (error) {
    console.error("Error placing COD order:", error);
    res.status(500).json({ success: false, message: "Order placement failed" });
  }
};

const verifyOder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//user orders for the frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// order list for admin
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export {
  placeOrder,
  verifyOder,
  userOrders,
  listOrders,
  updateStatus,
  codOrder,
};
