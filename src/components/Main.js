import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'

import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://192.168.0.3:3456')

export default class Main extends Component {
    constructor(props) {
        super(props)
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
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.whatPage}>MAIN APP</Text>
                <Button style={styles.countButton} title="QR Scanner" onPress={() => this.props.navigation.navigate('qrscanner')} />
                <Button style={styles.countButton} title="All Walls" onPress={() => this.props.navigation.navigate('allwalls')} />
                <Text style={styles.whatPage}>DEMO APP</Text>
                <Button style={styles.countButton} title="go to user page" onPress={() => this.props.navigation.navigate('user')} />
                <Text style={styles.whatPage}>MAIN PAGE</Text>
                <Button title="      +      " onPress={() => this.handleCountUp()} />
                <Text style={styles.counterText}>redux only = {this.props.local.count}</Text>
                <Text style={styles.counterText}>rethinkDB + redux = {this.props.db.count}</Text>
                <Button title="      -      " onPress={() => this.handleCountDown()} />
            </View>
        )
    }
}
