import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { getRootNavigator } from './src/navigator'
import * as screens from './src/containers'
import changefeedListeners from './src/redux/changefeed-listeners'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './src/redux/store';
export const store = configureStore().store
const persistor = configureStore().persistor

changefeedListeners(store)

const RootNavigator = getRootNavigator()

export default class App extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
				<RootNavigator {...this.props} />
				</PersistGate>
			</Provider>
		)
	}
}
