/*
RethinkDB changefeed logic
*/
import {
	tables,
} from '../../config'
var r = require('rethinkdb')
var actions = require('../../actions')

export const userChangefeeds = (socket) => {

	return function(rows) {
		rows.each(function(err, row) {
			if (err) {
				return console.log(err)
			}
			else if (row.new_val && !row.old_val) {	//	insert
				socket.emit('changefeed_' + actions.INSERT_OBJECT, row.new_val)
			}
			else if (row.new_val && row.old_val) {	//	edit
				socket.emit('changefeed_' + actions.EDIT_OBJECT, row.new_val)
			}
			else if (row.old_val && !row.new_val) {	//	delete
				socket.emit('changefeed_' + actions.DELETE_OBJECT, row.old_val)
			}
		})
	}
}

//	TODO: update walls with images
export const imageChangefeeds = (dbConnx) => {

	return function(rows) {
		rows.each(function(err, row) {
			if (err) {
				return console.log(err)
			}
			else if (row.new_val && !row.old_val) {	//	insert
				console.log('image inserted')
				// socket.emit('imageToWall', row.new_val)
			}
			else if (row.new_val && row.old_val) {	//	edit
				// socket.emit('imageToWall', row.new_val)
			}
			else if (row.old_val && !row.new_val) {	//	delete
				// socket.emit('imageToWall', row.old_val)
			}
		})
	}
}

//	TODO: update userInstance with walls
export const wallChangefeeds = (dbConnx) => {

	return function(rows) {
		rows.each(function(err, row) {
			if (err) {
				return console.log(err)
			}
			else if (row.new_val && !row.old_val) {	//	insert
				console.log('wall inserted')
				// socket.emit('imageToWall', row.new_val)
			}
			else if (row.new_val && row.old_val) {	//	edit
				console.log('wall edited')
				// socket.emit('imageToWall', row.new_val)
			}
			else if (row.old_val && !row.new_val) {	//	delete
				// socket.emit('imageToWall', row.old_val)
			}
		})
	}
}
