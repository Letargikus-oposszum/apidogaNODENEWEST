import express, { json } from "express";
import * as orderMethod from "../database/order.js";

const orderRouter = express.Router();

orderRouter.get("/orders", (req, res) => {
  res.status(200).json(orderMethod.getOrders());
});

orderRouter.get("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ message: "Invalid id" });
  const found = orderMethod.getOrderById(id);
  if (!found) {
    return res.status(404).json({ message: "Order not found!" });
  }
  return res.status(200).json(found);
});

orderRouter.post("/orders", (req, res) => {
  const { productName, productType, quantity, price, created } = req.body;

  // productType may be 0, so check for null/undefined explicitly
  if (
    productName == null ||
    productType == null ||
    quantity == null ||
    price == null ||
    created == null
  ) {
    return res.status(400).json({ message: "Missing data!" });
  }

  try {
    const result = orderMethod.addOrder(
      productName,
      productType,
      quantity,
      price,
      created,
    );
    return res
      .status(201)
      .json({
        message: "Order created successfully!",
        id: result.lastInsertRowid,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create order" });
  }
});

orderRouter.put("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ message: "Invalid id" });

  const { productName, productType, quantity, price, created } = req.body;

  if (
    productName == null ||
    productType == null ||
    quantity == null ||
    price == null || 
    created == null
  ) {
    return res.status(400).json({ message: "Missing data!" });
  }

  const existing = orderMethod.getOrderById(id);
  if (!existing) return res.status(404).json({ message: "Order not found!" });

  try {
    orderMethod.updateOrder(
      productName,
      productType,
      quantity,
      price,
      created,
      id,
    );
    return res.status(200).json({ message: "Order updated successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update order" });
  }
});

orderRouter.delete("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ message: "Invalid id" });

  const existing = orderMethod.getOrderById(id);
  if (!existing) return res.status(404).json({ message: "Order not found!" });

  try {
    orderMethod.deleteOrder(id);
    return res.status(200).json({ message: "Order deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete order" });
  }
});

export default orderRouter;
