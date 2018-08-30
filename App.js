import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { TabNavigator } from 'react-navigation'
import * as screens from './src/containers'
import changefeedListeners from './src/db/changefeed-listeners'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './src/redux-config/store';
const store = configureStore().store
const persistor = configureStore().persistor

changefeedListeners(store)

const RootNavigator = TabNavigator({
	main: {
		screen: screens.Main,
		navigationOptions: {
			tabBarLabel: 'login',
			tabBarVisible: false,
			swipeEnabled: false,
		},
	},
	user: {
		screen: screens.User,
		navigationOptions: {
			tabBarLabel: 'climber',
		},
	},
	qrscanner: {
		screen: screens.QRScanner,
	},
	rockwall: {
		screen: screens.RockWall,
	},
	allwalls: {
		screen: screens.AllWalls,
		navigationOptions: {
			tabBarLabel: 'walls',
		},
	}
}, {
	order: ['main','user','allwalls'],
	initialRouteName: 'main',
	tabBarOptions: {
		style: {
			backgroundColor: '#555',
		},
		labelStyle: {
			fontSize: 14,
			fontWeight: 'bold',
		},
		activeTintColor: '#fff',
        inactiveTintColor: '#000',
    },
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
