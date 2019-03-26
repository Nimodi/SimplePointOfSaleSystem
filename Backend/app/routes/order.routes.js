module.exports = (app) => {
    const orders = require('../controllers/order.controller.js');

    // Create a new Note
    app.post('/orders', orders.create);

    // Retrieve all Notes
    app.get('/orders', orders.findAll);

    // Retrieve a single Note with noteId
    app.get('/orders/:orderId', orders.findOne);

    // Update a Note with noteId
    app.put('/orders/:orderId/:itemId', orders.update);

    // Delete a Note with noteId
    app.delete('/orders/:itemId', orders.delete);

    app.delete('/orders/:orderId/:itemId', orders.delete);
}

