import orderModel from "../schema/orderModel.js";
import { sendOrderEmail } from "../utils/mailer.js";

const order = async (req, res) => {
  try {
    const { user, guestInfo, products, totalPrice, address, number } = req.body;

    if (
      (!user && !guestInfo) || // Either user or guestInfo must be present
      !products.length ||
      !totalPrice ||
      !address?.location ||
      !address?.district ||
      !address?.division ||
      !number
    ) {
      return res.status(400).json({
        message: "All fields are required",
        details: {
          missingFields: {
            user: !user && !guestInfo ? "Required" : "Provided",
            products: !products.length ? "Required" : "Provided",
            totalPrice: !totalPrice ? "Required" : "Provided",
            address: !address
              ? "Required"
              : {
                  location: !address?.location ? "Required" : "Provided",
                  district: !address?.district ? "Required" : "Provided",
                  division: !address?.division ? "Required" : "Provided",
                },
            number: !number ? "Required" : "Provided",
          },
        },
      });
    }

    const newOrder = new orderModel({
      user: user || null, // Set to null if guest
      guestInfo: !user ? guestInfo : undefined, // Only include guestInfo if not a user
      products,
      totalPrice,
      address,
      number,
    });

    await newOrder.save();

    sendOrderEmail(newOrder)
      .then(() => console.log("Email sent successfully"))
      .catch((err) => console.error("Email sending failed:", err));

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!["Processing", "Out for Delivery", "Delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (status === "Delivered") {
      const deleted = await orderModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Order not found" });

      return res.status(200).json({ message: "Order delivered and deleted" });
    }

    const order = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export { order, getOrders, updateOrderStatus };
