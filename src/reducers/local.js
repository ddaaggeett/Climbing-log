import * as actions from '../actions'

const initialState = {
	count: 0,
}

export default function local(state = initialState, action) {
	switch(action.type) {

		case actions.COUNT_UP:
            return {
				...state,
				count: state.count + 1
			}

		case actions.COUNT_DOWN:
            return {
				...state,
				count: state.count - 1
			}

        default:
			return state

	}
}
