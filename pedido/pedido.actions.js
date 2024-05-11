const Order = require("../pedido/pedido.model");

async function getFilteredOrders(userId, filters) {
  if (!filters.hasOwnProperty("deleted")) {
    filters["deleted"] = false;
  }

  filters["buyer_id"] = userId;

  const orders = await Order.find(filters, { deleted: 0, createdAt: 0, updatedAt: 0, buyer_id: 0, seller_id: 0 });

  return { results: orders };
}

async function getOrderById(id) {
  const order = await Order.findById(id);
  return order;
}

async function createOrder(orderData) {
  const createdOrder = await Order.create(orderData);
  return createdOrder;
}

async function updateOrderStatus(id, status) {
  await Order.findByIdAndUpdate({ _id: id }, { state: status, deleted: true });
}


async function deleteOrder(id) {
  const result = await Order.findByIdAndUpdate(id, { deleted: true });
  return result;
}

module.exports = {
  createOrder,
  getFilteredOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};
