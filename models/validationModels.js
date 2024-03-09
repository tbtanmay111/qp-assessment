const Joi = require("joi");

const patchItemsValidation = Joi.object({
    inventoryLevel: Joi.number().required()
});

const payloadValidation = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    inventoryLevel: Joi.number().required()
});

const updatePayloadValidation = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    inventoryLevel: Joi.number().required()
});

const orderPayloadValidation = Joi.object({
    items: Joi.array().items(Joi.object({
        id: Joi.number().required(),
        quantity: Joi.number().required()
    }).required()).required()
});

module.exports = {
    patchItemsValidation,
    payloadValidation,
    orderPayloadValidation,
    updatePayloadValidation
}