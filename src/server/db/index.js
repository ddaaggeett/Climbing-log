import {
    socketPort,
    db_host,
    db_port,
    db,
    tables,
} from '../../config'
import {
    userChangefeeds,
    imageChangefeeds,
    wallChangefeeds,
} from './changefeeds'
import {
    handleImageInsert,
    handleWallScan,
} from './dataStructure'
var actions = require('../../actions')
var r = require('rethinkdb')
var dbConnx = null
var io = require('socket.io').listen(socketPort)

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
                    if(tableName === tables.users) {
                        r.table(tables.users).indexCreate('username').run(connection, () => console.log('secondary index \'username\' set on users table')) // TODO: or 'email' - whichever secondary index is decided to be unique per user
                    }
                })
            })(tbl)
        }
    })
}).then(function(connection) {

    dbConnx = connection

	io.on('connection', function (socket) {

        socket.on('wallScan', (wallObject) => handleWallScan(wallObject))

        socket.on('newWallImage', (newImageObject) => handleImageInsert(newImageObject))

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

        // RethinkDB changefeed
        r.table(tables.users).changes({ includeInitial: true, squash: true }).run(connection).then(userChangefeeds(socket))
        r.table(tables.images).changes().run(connection).then(imageChangefeeds(socket))
        r.table(tables.walls).changes().run(connection).then(wallChangefeeds(socket))
	})
})
.error(function(error) {
	console.log('Error connecting to RethinkDB!\n',error)
})

export {
    r,
    dbConnx,
}
