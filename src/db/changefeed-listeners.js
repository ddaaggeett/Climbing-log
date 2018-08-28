/*
RethinkDB changefeed changefeedListeners
handles redux action dispathes
*/
import * as actions from '../actions'
import * as actionCreators from '../actions/actionCreators'
import rnConfig from '../../config/rnConfig'
import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://' + rnConfig.serverIP + ':' + rnConfig.socketPort)

function dispatchRedux(changefeedType, store, object) {
    if(object.name === store.getState().user.name) { // ensure changefeed equals the user on client device // TODO: user authentication instead!
        store.dispatch(actionCreators.updateUserInst(object))
    }
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
