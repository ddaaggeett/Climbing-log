import {
    getRecentWallClimberArray,
    getNewImageArray,
} from '../../logic'
import {
    tables,
} from '../../config'
import {
    dbConnx,
} from '.'
var r = require('rethinkdb')

export const handleWallScan = (scanObject) => {
    r.table(tables.walls).get(scanObject.id).run(dbConnx)
    .then(currentWallObject => {
        const newWallObject = {
            ...currentWallObject,
            climbers: getRecentWallClimberArray(scanObject.climber_id, currentWallObject.climbers),
        }
        r.table(tables.walls).update(newWallObject).run(dbConnx)
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
        r.table(tables.walls).insert(wallObject).run(dbConnx)
    })
}

export const handleImageInsert = (newImageObject) => {
    r.table(tables.images).insert(newImageObject).run(dbConnx)
    .then(data => {
        const newImageID = data.generated_keys[0]
        getWallObject(newImageID)
        .then(wallObject => {
            newImageToWall(newImageID, wallObject)
        })
    })
    .catch((error) => {
        console.log('ERROR inserting image')
        console.log(error)
    })
}

const getWallObject = (imageID) => {
    return new Promise((resolve, reject) => {
        r.table(tables.images).get(imageID).run(dbConnx)
        .then(data => {
            const wallID = data.wall_id
            r.table(tables.walls).get(wallID).run(dbConnx)
            .then(currentWallObject => {
                resolve(currentWallObject)
            })
        })
        .catch((error) => {
            console.log('ERROR getting wall data')
            console.log(error)
        })
    })
}

const newImageToWall = (newImageID, wallObject) => {
    const newWallObject = {
        ...wallObject,
        images: getNewImageArray(newImageID, wallObject),
    }
    r.table(tables.walls).update(newWallObject).run(dbConnx)
    //  TODO: .then()
}

export const getUserObjectOnWallChange = (wallID, userID) => {
    return new Promise((resolve, reject) => {
        r.table(tables.users).get(userID).run(dbConnx)
        .then(userObject => {
            resolve(userObject)
        })
        .catch(error => {
            console.log('ERROR getUserObjectOnWallChange()')
            console.log(error)
        })
    })
}

export const handleUpdateUserInst = (newUserInst) => {
    r.table(tables.users).update(newUserInst).run(dbConnx)
    .catch(error => {
        r.table(tables.users).insert(newUserInst).run(dbConnx)
    })
}
