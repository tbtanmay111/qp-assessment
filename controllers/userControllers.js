const {orderPayloadValidation} = require("../models/validationModels");
let groceryItems = require("../constants/constants");
const Boom= require("@hapi/boom");

const getItemsRoute = {
    method: 'GET',
    path: '/items',
    handler: (request, h) => {
        return groceryItems;
    }
};

const placeOrderRoute = {
    method: 'POST',
    path: '/user/orders',
    options: {
        validate: {
            payload: orderPayloadValidation
        }
    },
    handler: (request, h) => {
        const orderItems = request.payload.items;

        orderItems.map(orderItem => {
            const item = groceryItems.find(item => item.id === orderItem.id);
            if (item) {
                if (item.inventoryLevel >= orderItem.quantity) {
                    item.inventoryLevel -= orderItem.quantity;
                } else {
                    throw Boom.forbidden(`Quantity id greater then inventory Value. Please enter a value lower than : ${item.inventoryLevel}`);
                }
            } else {
                throw Boom.notFound('ID is invalid please enter a valid ID');
            }

        })
        return {message: 'Order Placed Successfully'};
    }
};

module.exports = {
    getItemsRoute,
    placeOrderRoute
}