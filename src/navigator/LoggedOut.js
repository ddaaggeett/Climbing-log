import { createStackNavigator } from 'react-navigation'
import * as screens from '../containers'

const LoggedOutNavigator = createStackNavigator({
	main: {
		screen: screens.Main,
	},
}, {
    navigationOptions: {
        header: null,
    },
})


export default LoggedOutNavigator
