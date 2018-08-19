import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image, ImageBackground, TextInput } from 'react-native'
import * as actions from '../actions'
import { styles } from '../styles'
import rnConfig from '../../config/rnConfig' // TODO: use a single source for configs

import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://' + rnConfig.serverIP + ':' + rnConfig.socketPort)

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleChangeUserID(text) {
        this.setState({
            name: text,
        })
    }
    handleSubmitUserID() {
        const newUserInst = {
            ...this.props.user,
            name: this.state.name,
        }
        socket.emit(actions.UPDATE_USER_INST, newUserInst) // DB + Redux
        this.props.navigation.navigate('user')
    }
    render() {
        return (
            <ScrollView endFillColor={'#47515b'}>
            <View style={styles.container}>
                <Image style={styles.cover_image} source={require('../assets/img/rockwall-misc.png')} />
                <Text style={[styles.text, styles.appName]}>climblogger</Text>
                <Text style={styles.text}>your climbing extravaganza on record</Text>
                <TextInput style={[styles.text, styles.userID_enter]} defaultValue={this.props.user.name} onChangeText={(text) => this.handleChangeUserID(text)} />
                <Button title="enter" onPress={() => this.handleSubmitUserID()} />
            </View>
            </ScrollView>
        )
    }
}
