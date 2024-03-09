const Hapi = require('@hapi/hapi');
const {getItemsRoute, placeOrderRoute} = require("./controllers/userControllers");
const {
    updateItemAdminRoute,
    deleteItemAdminRoute,
    updateInventoryAdminRoute,
    addItemAdminRoute
} = require("./controllers/adminControllers");

const init = async () => {
    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
        routes: {
            cors: true
        }
    });

    server.route(addItemAdminRoute);
    server.route(deleteItemAdminRoute);
    server.route(updateItemAdminRoute);
    server.route(updateInventoryAdminRoute);

    server.route(getItemsRoute);
    server.route(placeOrderRoute);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();