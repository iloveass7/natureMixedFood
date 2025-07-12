import nodemailer from "nodemailer";
import orderModel from "../schema/orderModel.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const sendOrderEmail = async (orderDetails) => {
  try {
    // Populate order details
    const populatedOrder = await orderModel
      .findById(orderDetails._id)
      .populate("user")
      .populate("products.product");

    // Create transporter with secure configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify connection configuration
    await transporter.verify();
    console.log("Server is ready to send emails");

    // Email content - improved template
    const mailOptions = {
      from: `"Nature Mixed Food" <${process.env.EMAIL_USER}>`,
      to: "naturemixedfood@gmail.com", // Admin email
      subject: `New Order #${orderDetails._id.toString().slice(-6)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2e7d32;">New Order Notification</h2>
          <p>A new order has been placed:</p>
          
          <h3>Order Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Order ID</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${
                orderDetails._id
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Customer</td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                ${
                  populatedOrder.user?.name ||
                  populatedOrder.guestInfo?.name ||
                  "Guest"
                }
              </td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Total Amount</td>
              <td style="padding: 8px; border: 1px solid #ddd;">$${orderDetails.totalPrice.toFixed(
                2
              )}</td>
            </tr>
          </table>

          <h3>Products</h3>
          <ul style="list-style: none; padding: 0;">
            ${populatedOrder.products
              .map(
                (item) => `
              <li style="margin-bottom: 10px; padding: 10px; background: #f5f5f5;">
                ${item.product.name} - 
                Qty: ${item.quantity} - 
                $${(item.product.price * item.quantity).toFixed(2)}
              </li>
            `
              )
              .join("")}
          </ul>

          <h3>Delivery Information</h3>
          <p>
            ${orderDetails.address.location}, ${
        orderDetails.address.district
      }, ${orderDetails.address.division}<br>
            Phone: ${orderDetails.number}
          </p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending order email:", error);
    throw error;
  }
};
