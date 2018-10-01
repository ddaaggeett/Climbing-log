import {
    getRecentWallClimberArray,
} from '../../logic'
import {
    tables,
} from '../../config'
var r = require('rethinkdb')

export const handleWallScan = (scanObject, connx) => {
    r.table(tables.walls).get(scanObject.id).run(connx)
    .then(currentWallObject => {
        const recentWallClimberArray = getRecentWallClimberArray(scanObject.climber_id, currentWallObject.climbers)
        const newWallObject = {
            ...currentWallObject,
            climbers: recentWallClimberArray,
        }
        r.table(tables.walls).update(newWallObject).run(connx)
        //  TODO: .then() update UserInst of climbers[0] - take data logic out of QRScanner.js
    })
    .catch(error => {
        //  this shouldn't fire because the wall creator should have already created the wall object
        const wallObject = {
            id: scanObject.id, // rid line?
            climbers: [
                scanObject.climber_id,
            ]
        }
        r.table(tables.walls).insert(wallObject).run(connx)
    })
}
