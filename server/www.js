const aidocApp = require('./app');

const server = aidocApp.listen(5050, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Aidoc server listening at http://%s:%s', host, port);
});