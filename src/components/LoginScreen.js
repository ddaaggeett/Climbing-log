import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button,
    Image,
    ImageBackground,
    TextInput,
    Linking,
    Platform,
 } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import SafariView from 'react-native-safari-view'
import * as actions from '../actions'
import { styles, iconStyles } from '../styles'
import rnConfig from '../../config/rnConfig' // TODO: use a single source for configs
import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://' + rnConfig.serverIP + ':' + rnConfig.socketPort)

export default class LoginScreen extends Component {
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
        const user = JSON.parse(decodeURI(user_string))
        this.setState({ // TODO: use redux instead
            user: user
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
/*
    handleChangeUserID(text) {
        this.props.alterLoginName(text)
    }

    handleSubmitUserID() {
        const newUserInst = {
            id: this.props.user.id,
            lastLogin: Date.now(),
        }
        socket.emit(actions.UPDATE_USER_INST, newUserInst) // DB + Redux
        this.props.navigation.navigate('user')
    }
*/
    render() {
		if(!this.state.user) return ( // not logged in
            <ScrollView endFillColor={'#47515b'}>
            <View style={styles.container}>
                <Image style={styles.cover_image} source={require('../assets/img/rockwall-misc.png')} />
                <Text style={[styles.text, styles.appName]}>climblogger</Text>
                <Text style={styles.text}>your climbing extravaganza on record</Text>
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
            </ScrollView>
		)
		else { // logged in
			socket.emit(actions.UPDATE_USER_INST, this.state.user)
	        this.props.navigation.navigate('user')
			return null
		}
    }
}
