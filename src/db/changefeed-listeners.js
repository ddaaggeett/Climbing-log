/*
RethinkDB changefeed changefeedListeners
handles redux action dispathes
*/
import * as actions from '../actions'
import * as actionCreators from '../actions/actionCreators'

import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://192.168.0.3:3456')

function dispatchRedux(changefeedType, store, object) {
    store.dispatch(actionCreators.updateUserInst(object))
}

export default function(store) {

    socket.on('changefeed_' + actions.INSERT_OBJECT, (object) => {
        dispatchRedux('insert', store, object)
    })

	socket.on('changefeed_' + actions.EDIT_OBJECT, function (object) {
        dispatchRedux('edit', store, object)
	});

	socket.on('changefeed_' + actions.DELETE_OBJECT, function (object) {
        dispatchRedux('delete',store, object)
	});
}
