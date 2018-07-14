import * as actions from '.'

export function updateUserInst(newUserInst) {
    return {
        type: actions.UPDATE_USER_INST,
        newUserInst
    }
}
export function updateWall(newWall) {
    return {
        type: actions.UPDATE_WALL,
        newWall
    }
}
export function countUp() {
    return {
        type: actions.COUNT_UP,
    }
}
export function countDown() {
    return {
        type: actions.COUNT_DOWN,
    }
}
