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

export const getNewUserInstOnWallChange = (userObject, wallID) => {
    const newWallObjectForUser = {
    	id: wallID,
    	succeeded: false,
    }
    var newUserInst = {}
    if(userObject.walls == undefined) { // first wall
    	return {
    		...userObject,
    		walls: [
    			newWallObjectForUser
    		],
    	}
    }
    else { // not first wall
    	const userWallIndex = findUserWallIndex(wallID, userObject.walls)
    	if(userWallIndex == null) { // wall doesn't exist yet - add to front
    		return {
    			...userObject,
    			walls: [
    				newWallObjectForUser,
    				...userObject.walls,
    			],
    		}
    	}
    	else { // wall exists, update to front
    		return {
    			...userObject,
    			walls: [
    				userObject.walls[userWallIndex],
    				...userObject.walls.slice(0, userWallIndex),
    				...userObject.walls.slice(userWallIndex + 1),
    			],
    		}
    	}
    }
}
