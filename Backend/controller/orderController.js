import orderModel from "../schema/orderModel.js";

const order = async (req, res) => {
  try {
    const { user, products, totalPrice, address, number } = req.body;

    if (!user || !products.length || !totalPrice || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new orderModel({
      user,
      products,
      totalPrice,
      address,
      number,
    });
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ status: false })
      .populate("user")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No unapproved orders found" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching unapproved orders:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const approveOrder = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status: true },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order approved successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getApproveOrder = async (req, res) => {
  try {
    const approvedOrders = await orderModel.find({ status: true });

    res.status(200).json(approvedOrders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export { order, getOrders, approveOrder, getApproveOrder };
