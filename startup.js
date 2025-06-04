const async = require('async');
const dbConnector = require('./db/config/dbConnector');
const authConnection = require('./db/config/dbAuthenticator');

async.series([(callback) => {
    authConnection(dbConnector, (err, data) => {
        if (!err) {
            process.nextTick(callback, null)
        } else {
            process.nextTick(callback, new Error(err))
        }
    })
}, (callback) => {
    dbConnector.sync()
        .then(() => {
            console.log('Database synced');
            process.nextTick(callback, null);
        })
        .catch(err => {
            console.error('Error syncing database:', err);
            process.nextTick(callback, new Error(err));
        });
}, (callback) => {
    require('./app');
    process.nextTick(callback, null);
}, (callback) => {
    require('./jobs/fileProcessor');
    console.log('Worker Started ...');
    process.nextTick(callback, null);
}, (callback) => {
    require('./jobs/RerunFileJobs').reRun();
    process.nextTick(callback, null);
}], (err) => {
    console.log(err);
})