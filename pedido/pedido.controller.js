const { createOrderMongo, getOrderMongo,deleteOrderMongo,updateOrderMongo, getOrderByIdMongo} = require("../pedido/pedido.actions");

async function getFilteredOrders(query,id) {
    
    const resultadosBusqueda = await getOrderMongo(query,id);

    return resultadosBusqueda;
}

async function getOrderById(id) {
    
    const order = await getOrderByIdMongo(id);

    return order;
}

async function createOrder(datos, id) {

    datos["buyer_id"] = id
    const productoCreado = await createOrderMongo(datos);

    return productoCreado;
}


function updateOrder(id, status) {

    const updateOrder = updateOrderMongo(id, status);

    return updateOrder;
}

function deleteOrder(id) {

    const productoCreado = deleteOrderMongo(id);

    return productoCreado;
}

module.exports = {
    getFilteredOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}