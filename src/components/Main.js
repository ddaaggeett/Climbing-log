import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image, ImageBackground, TextInput } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'

import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://192.168.0.3:3456') // TODO: react-native config

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userID: ''
        }
    }
    handleCountUp() {
        this.props.countUp()

        const newUserInst = {
            ...this.props.db,
            count: this.props.db.count + 1
        }
        socket.emit(actions.UPDATE_USER_INST, newUserInst)
    }
    handleCountDown() {
        this.props.countDown() // Redux only

        const newUserInst = {
            ...this.props.db,
            count: this.props.db.count - 1
        }
        socket.emit(actions.UPDATE_USER_INST, newUserInst) // DB + Redux
    }
    handleChangeUserID(text) {
        this.setState({
            userID: text,
        })
        console.log(this.state.userID)
    }
    render() {
        return (
            <ScrollView endFillColor={'#47515b'}>
                <View style={styles.container}>
                <Image style={styles.cover_image} source={require('../assets/img/rockwall-misc.png')} />
                <Text style={[styles.text, styles.appName]}>climblogger</Text>
                <Text style={styles.text}>your climbing extravaganza on record</Text>
                <TextInput style={styles.text} defaultValue="user ID" onChangeText={(text) => this.handleChangeUserID(text)}/>
                <Button title="QR Scanner" onPress={() => this.props.navigation.navigate('qrscanner')} />
                <Button title="All Walls" onPress={() => this.props.navigation.navigate('allwalls')} />
                <Button title="go to user page" onPress={() => this.props.navigation.navigate('user')} />

                <Button title="      +      " onPress={() => this.handleCountUp()} />
                <Text style={styles.text}>redux only = {this.props.local.count}</Text>
                <Text style={styles.text}>rethinkDB + redux = {this.props.db.count}</Text>
                <Button title="      -      " onPress={() => this.handleCountDown()} />
                </View>
            </ScrollView>
        )
    }
}
