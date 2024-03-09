const Joi = require("joi");
let groceryItems = require("../constants/constants");
const {
    payloadValidation,
    patchItemsValidation,
    updatePayloadValidation
} = require("../models/validationModels");
let nextId = 4;

const addItemAdminRoute = {
    method: 'POST',
    path: '/items',
    options: {
        validate: {
            payload: payloadValidation
        }
    },
    handler: (request, h) => {
        const newItem = {
            id: nextId++,
            name: request.payload.name,
            price: request.payload.price,
            inventoryLevel: request.payload.inventoryLevel
        };
        groceryItems.push(newItem);
        return {message: 'New Item Added : ', newItem};
    }
}

const updateInventoryAdminRoute = {
    method: 'PUT',
    path: '/items/{id}',
    options: {
        validate: {
            params: Joi.object({
                id: Joi.number().required()
            }),
            payload: updatePayloadValidation
        }
    },
    handler: (request, h) => {
        const id = parseInt(request.params.id);
        const item = groceryItems.map((item) => {
            if (item.id === id) {
                item.name = request.payload.name;
                item.price = request.payload.price;
                item.inventoryLevel = request.payload.inventoryLevel;
                return {message: 'Item was updated', item};
            }
        });
        if (item) {
            return item;
        } else {
            return {message: 'Item Not found'};
        }
    }
};

const updateItemAdminRoute = {
    method: 'PATCH',
    path: '/items/{id}',
    options: {
        validate: {
            params: Joi.object({
                id: Joi.number().required()
            }),
            payload: patchItemsValidation,
        }
    },
    handler: (request, h) => {
        const id = parseInt(request.params.id);
        const item = groceryItems.map((item) => {
            if (item.id === id) {
                item.inventoryLevel = request.payload.inventoryLevel;
                return {message: 'Item was updated', item};
            }
        });
        if (item) {
            return item;
        } else {
            return {message: 'Item Not found'};
        }
    }
};

const deleteItemAdminRoute = {
    method: 'DELETE',
    path: '/items/{id}',
    options: {
        validate: {
            params: Joi.object({
                id: Joi.number().required()
            })
        }
    },
    handler: (request, h) => {
        const id = parseInt(request.params.id);
        groceryItems = groceryItems.filter(item => item.id !== id);
        return {message: 'Item deleted'};
    }
};

module.exports = {
    addItemAdminRoute,
    updateItemAdminRoute,
    deleteItemAdminRoute,
    updateInventoryAdminRoute
}