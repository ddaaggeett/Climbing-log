import { TabNavigator } from 'react-navigation'
import * as screens from '../containers'

const LoggedInNavigator = TabNavigator({
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
	order: ['user','allwalls'],
	initialRouteName: 'user',
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

export default LoggedInNavigator
