import * as actions from '.'

export function updateUserInst(newUserInst) {
    return {
        type: actions.UPDATE_USER_INST,
        newUserInst
    }
}
export function alterLoginName(name) {
    return {
        type: actions.ALTER_LOGIN_NAME,
        name
    }
}
export function swapWallView(view) {
    return {
        type: actions.SWAP_WALL_VIEW,
        view
    }
}
