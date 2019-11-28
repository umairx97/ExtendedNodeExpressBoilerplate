exports = module.exports = function (app, moongose) {

    const chalk = require('chalk');

    app.db = moongose.createConnection(app.get('MONGO_URI'), { useNewUrlParser: true, useUnifiedTopology: true });
    app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
    app.db.once('open', () => {
        console.log(chalk.hex(`#009688`)(`🚀 App: Bootstrap Succeeded.`));
        console.log(chalk.hex(`#009688`)(`🚀 Mongo: Connection Succeeded.`))
        console.log('🚀 mongoose open for business');
    });

}


