'use strict';

const Hapi = require('hapi');
const HapiOpenAPI = require('hapi-openapi');
const Path = require('path');

const init = async function() {
    const server = new Hapi.Server({
        host: "127.0.0.1",
        port: 3000,
        debug: {
            log: "error",
            request: "*"
        },
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(require('inert'));
    await server.register({
        plugin: HapiOpenAPI,
        options: {
            api: Path.resolve('./config/swagger.yaml'),
            handlers: Path.resolve('./handlers')
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });

    await server.start();

    return server;
};

init().then((server) => {
    server.plugins.openapi.setHost(server.info.host + ':' + server.info.port);
    console.log("server started");
    server.log(['info'], `Server running on ${server.info.host}:${server.info.port}`);
});
