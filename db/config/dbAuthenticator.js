const authConnection = (connector, callback) => {
    connector.authenticate().then((res) => {
        console.log('-----------------------------------------');
        console.log('Connection to database has been established successfully.');
        console.log('-----------------------------------------');
        console.log(res);
        process.nextTick(callback, null);
    }).catch((err) => {
        console.error('Something went wrong while connecing to database: ', err);
        process.nextTick(callback, new Error(err))
    });
}

module.exports = authConnection;

