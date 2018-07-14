import * as actions from '../actions'

const initialState = {
	count: 0,
}

export default function db(state = initialState, action) {
	switch(action.type) {

		case actions.UPDATE_USER_INST:
            return action.newUserInst

		case actions.UPDATE_WALL:
            return action.newWall

        default:
			return state

	}
}
