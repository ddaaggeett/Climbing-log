import * as actions from '../actions'

const initialState = {
	name: 'userID',
}

export default function user(state = initialState, action) {
	switch(action.type) {

		case actions.UPDATE_USER_INST:
            return action.newUserInst

        default:
			return state

	}
}
