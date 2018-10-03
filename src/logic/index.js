export const findUserWallIndex = (wallID, walls) => {
    for(var x = 0; x < walls.length; x++) {
        if (walls[x].id == wallID) return x
        else if((x == walls.length - 1) && (walls[x].id != wallID)) {
            return null
        }
    }
}

export const getRecentWallClimberArray = (climberID, climbers) => {
    for(var x = 0; x < climbers.length; x++) {
        if (climbers[x] == climberID) {
            return [
                climbers[x],
                ...climbers.slice(0, x),
                ...climbers.slice(x + 1),
            ]
        }
        else if((x == climbers.length - 1) && (climbers[x] != climberID)) {
            return [
                climberID,
                ...climbers,
            ]
        }
    }
}

export const getNewImageArray = (newImageID, wallObject) => {
    if(wallObject.images == undefined) {
        return [
            newImageID
        ]
    }
    else return [
        newImageID,
        ...wallObject.images
    ]
}
