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
var tables = config.get('tables')

var ioServer = app.listen(process.env.PORT || socket_port, function() {
    var host = db_host
    var port = ioServer.address().port
    console.log('socket.io listening at http://' + host + ':' + port)
})
var io = require('socket.io')(ioServer, {pingTimeout: 1})

r.connect({
    host: db_host,
    port: db_port,
    db: db
}, function (err, connection) {
    r.dbCreate(db).run(connection, function(err, result) {
        if(err) console.log("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", db, err.name, err.msg, err.message)
        else console.log("[INFO ] RethinkDB database '%s' created", db)
        for(var tbl in tables) {
            (function (tableName) {
                r.db(db).tableCreate(tableName).run(connection, function(err, result) {
                    if(err) console.log("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", tableName, err.name, err.msg, err.message)
                    else console.log("[INFO ] RethinkDB table '%s' created", tableName)
                })
            })(tbl)
        }
    })
}).then(function(connection) {

	io.sockets.on('connection', function (socket) {

        // TODO: pull specific user data upon user name entry. currently overwrites any user name with current user data loaded in redux.
        socket.on(actions.UPDATE_USER_INST, function(newUserInst) {
            try {
                r.table(tables.users).get(newUserInst.id).update(newUserInst).run(connection)
                    .then(data => { // TODO: handle all data.{deleted,errors,inserted,replaced,skipped,unchanged}
                        console.log(JSON.stringify(data,null,4))
                        if(data.inserted == 1) console.log(newUserInst.id + ' inserted')
                        else throw "user not available to update -> will insert user instead"
                    })
                    .catch(err => {
                        console.log(err)
                        console.log("inserting new user object: " + newUserInst.id)
                        r.table(tables.users).insert(newUserInst).run(connection)
                    }
                )
            }
            catch(err) { // never runs because using promise catch above
                r.table(tables.users).insert(newUserInst).run(connection)
            }
        })

        /*
        RethinkDB changefeed
        */
        r.table(tables.users).changes({ includeInitial: true, squash: true }).run(connection).then(changefeeds.changefeeds(socket))
	})
})
.error(function(error) {
	console.log('Error connecting to RethinkDB!\n',error)
})
