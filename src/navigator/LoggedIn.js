import { TabNavigator } from 'react-navigation'
import * as screens from '../containers'
import { store } from '../../App'
import { swapWallView } from '../actions/actionCreators'

const LoggedInNavigator = TabNavigator({
	user: {
		screen: screens.User,
		navigationOptions: {
			tabBarLabel: 'climber',
		},
	},
	allwalls: {
		screen: screens.AllWalls,
		navigationOptions: {
			tabBarLabel: 'walls',
			tabBarOnPress: () => {
				store.dispatch(swapWallView('allWalls'))
			},
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
