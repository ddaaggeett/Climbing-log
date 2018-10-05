import {
    db,
    tables,
} from '../../config'
var r = require('rethinkdb')

export const dbSetup = (connection) => {
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
}
