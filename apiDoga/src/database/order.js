import db from "./databaseGN.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS Orders (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    ProductName TEXT NOT NULL,
    ProductType INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    Price NUMERIC NOT NULL,
    Created TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
    )`,
).run();

export const getOrders = () => db.prepare(`SELECT * FROM Orders`).all();

export const getOrderById = (id) =>
  db.prepare(`SELECT * FROM Orders WHERE Id = ?`).get(id);

export const addOrder = (productName, productType, quantity, price, created) =>
  db
    .prepare(
      `INSERT INTO Orders (ProductName, ProductType, Quantity, Price, Created) VALUES (?, ?, ?, ?, ?)`,
    )
    .run(productName, productType, quantity, price, created);

export const updateOrder = (
  productName,
  productType,
  quantity,
  price,
  created,
  id,
) =>
  db
    .prepare(
      `UPDATE Orders SET ProductName = ?, ProductType = ?, Quantity = ?, Price = ?, Created = ? WHERE Id = ?`,
    )
    .run(productName, productType, quantity, price, created, id);

export const deleteOrder = (id) =>
  db.prepare(`DELETE FROM Orders WHERE Id = ?`).run(id);
