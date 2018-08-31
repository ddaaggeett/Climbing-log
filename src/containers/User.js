import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import User from '../components/User'

import * as actionCreators from '../actions/actionCreators'

function mapStateToProps(state) {
	return {
		user: state.user,
		views: state.views,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, actionCreators), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
