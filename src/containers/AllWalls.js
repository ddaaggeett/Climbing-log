import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AllWalls from '../components/AllWalls'

import * as actionCreators from '../actions/actionCreators'

function mapStateToProps(state) {
	return {
		db: state.db,
		local: state.local,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, actionCreators), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AllWalls)
