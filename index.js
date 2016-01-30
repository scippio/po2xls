
console.log('PYCO: '+argv);

var po2xls = require('./lib/po2xls'),
    argv = require('yargs')
    .usage('Usage: $0 <file>')
    .command('file', 'Path to file')
    .demand(1)
    .alias('o','output')
    .default('output','./output.xls')
    .argv;

function exit(message, exit_code) {
    if (!exit_code) { exit_code = 0; }
    if (!message) { message = 'bye...'; }
    console.log(message);
    process.exit(exit_code);
}

process.on('SIGINT', function () {
    exit("\nRecieved SIGINT. bye");
});

po2xls.start(argv, exit, function(){});
