import * as actions from '../actions'

const initialState = {
	allWalls: true,
	scanner: false,
	singleWall: false,
	wallCamera: false,
}

export default function views(state = initialState, action) {
	switch(action.type) {

		case actions.SWAP_WALL_VIEW:
			if(action.view === 'allWalls'){
				return {
					...state,
					allWalls: true,
					scanner: false,
					singleWall: false,
					wallCamera: false,
				}
			}
			else if(action.view === 'scanner') {
				return {
					...state,
					allWalls: false,
					scanner: true,
					singleWall: false,
					wallCamera: false,
				}
			}
			else if(action.view === 'singleWall') {
				return {
					...state,
					allWalls: false,
					scanner: false,
					singleWall: true,
					wallCamera: false,
				}
			}
			else if(action.view === 'wallCamera') {
				return {
					...state,
					allWalls: false,
					scanner: false,
					singleWall: false,
					wallCamera: true,
				}
			}

        default:
			return state

	}
}
