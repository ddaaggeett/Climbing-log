import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RockWall from '../components/RockWall'

import * as actionCreators from '../actions/actionCreators'

function mapStateToProps(state) {
	return {
		user: state.user,
		local: state.local,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, actionCreators), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RockWall)
