export const findUserWallIndex = (wallID, walls) => {
    for(var x = 0; x < walls.length; x++) {
        if (walls[x].id == wallID) return x
        else if((x == walls.length - 1) && (walls[x].id != wallID)) {
            return null
        }
    }
}
