/*
RethinkDB changefeed logic
*/
var actions = require('../../actions')

const changefeeds = function(socket) {

	return function(rows) {
		rows.each(function(err, row) {
			if (err) {
				return console.log(err)
			}
			else if (row.new_val && !row.old_val) {	//	insert
				socket.emit('changefeed_' + actions.INSERT_OBJECT, row.new_val);
			}
			else if (row.new_val && row.old_val) {	//	edit
				socket.emit('changefeed_' + actions.EDIT_OBJECT, row.new_val);
			}
			else if (row.old_val && !row.new_val) {	//	delete
				socket.emit('changefeed_' + actions.DELETE_OBJECT, row.old_val);
			}
		});
	};
};

module.exports = {
	changefeeds
}
