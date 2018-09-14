/*
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { getRootNavigator } from './src/navigator'
import * as screens from './src/containers'
import changefeedListeners from './src/db/changefeed-listeners'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './src/redux-config/store';
export const store = configureStore().store
const persistor = configureStore().persistor

changefeedListeners(store)

const RootNavigator = getRootNavigator(false) // true if logged in

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
*/
import React, { Component } from 'react'
import {
    Image,
    Linking,
    Platform,
    Text,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import SafariView from 'react-native-safari-view'
import { styles, iconStyles } from './src/styles'

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            user: undefined, // user has not logged in yet
        }
    }

  // Set up Linking
    componentDidMount() {
        // Add event listener to handle OAuthLogin:// URLs
        Linking.addEventListener('url', this.handleOpenURL)
        // Launched from an external URL
        Linking.getInitialURL().then((url) => {
            if (url) {
                this.handleOpenURL({ url })
            }
        })
    }

    componentWillUnmount() {
        // Remove event listener
        Linking.removeEventListener('url', this.handleOpenURL)
    }

    handleOpenURL = ({ url }) => {
        // Extract stringified user string out of the URL
        const [, user_string] = url.match(/user=([^#]+)/)
        this.setState({
            // Decode the user string and parse it into JSON
            user: JSON.parse(decodeURI(user_string))
        }, () => {
            console.log('user is set\n' + JSON.stringify(this.state.user,null,4))
        })
        if (Platform.OS === 'ios') {
            SafariView.dismiss()
        }
    }

    // Handle Login with Github button tap
    loginWithGithub = () => this.openURL('http://localhost:3000/auth/github')

    // Open URL in a browser
    openURL = (url) => {
        // Use SafariView on iOS
        if (Platform.OS === 'ios') {
            SafariView.show({
                url: url,
                fromBottom: true,
            })
        }
        // Or Linking.openURL on Android
        else {
            Linking.openURL(url)
        }
    }

    render() {
        const { user } = this.state
        return (
            <View style={styles.container}>
                { user
                  ? // Show user info if already logged in
                    <View style={styles.content}>
                      <Text style={styles.header}>
                        Welcome, {user.name}!{'\n\n'}or should we call{'\n'}you {user.username}?
                      </Text>
                      <View style={styles.avatar}>
                        <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
                      </View>
                    </View>
                  : // Show Please log in message if not
                    <View style={styles.content}>
                      <View style={styles.buttons}>
                          <View
                              style={styles.login_button}
                              ><Icon.Button
                              name="github"
                              backgroundColor="gray"
                              onPress={this.loginWithGithub}
                              {...iconStyles} >
                              Login with Github
                          </Icon.Button></View>
                      </View>
                    </View>
                }
            </View>
        )
    }
}
