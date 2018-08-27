import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import * as screens from './src/containers'
import changefeedListeners from './src/db/changefeed-listeners'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './src/redux-config/store';
const store = configureStore().store
const persistor = configureStore().persistor

changefeedListeners(store)

const RootNavigator = StackNavigator({
	main: {
		screen: screens.Main,
	},
	user: {
		screen: screens.User,
	},
	qrscanner: {
		screen: screens.QRScanner,
	},
	rockwall: {
		screen: screens.RockWall,
	},
	allwalls: {
		screen: screens.AllWalls,
	}
},
{
	headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

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
