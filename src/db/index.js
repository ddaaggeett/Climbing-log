var actions = require('../actions')
var changefeeds = require('./changefeeds')
var express = require('express')
var app = express()
var r = require('rethinkdb')
var config = require('config')

var db_host = config.get('host')
var socket_port = config.get('socketPort')
var db_port = config.get('dbPort')
var db = config.get('db')
var db_table = config.get('table')

var ioServer = app.listen(process.env.PORT || socket_port, function() {
    var host = db_host
    var port = ioServer.address().port;
    console.log('socket.io listening at http://' + host + ':' + port);
});
var io = require('socket.io')(ioServer, {pingTimeout: 1})

r.connect({
    host: db_host,
    port: db_port,
    db: db
}).then(function(connection) {

	io.sockets.on('connection', function (socket) {

        socket.on(actions.UPDATE_USER_INST, function(newUserInst) {
            console.log('client trigger\n',newUserInst)
            try {
                r.table(db_table).get(newUserInst.id).update(newUserInst).run(connection);
            }
            catch(err) {
                r.table(db_table).insert(newUserInst).run(connection);
            }
        })

        /*
        RethinkDB changefeed
        */
        r.table(db_table).changes({ includeInitial: true, squash: true }).run(connection).then(changefeeds.changefeeds(socket));
	});
})
.error(function(error) {
	console.log('Error connecting to RethinkDB!\n',error);
});
