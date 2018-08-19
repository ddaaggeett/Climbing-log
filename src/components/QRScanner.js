import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Linking } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'
import QRCodeScanner from 'react-native-qrcode-scanner'
import rnConfig from '../../config/rnConfig' // TODO: use a single source for configs
import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://' + rnConfig.serverIP + ':' + rnConfig.socketPort)

export default class QRScanner extends Component {
    constructor(props) {
        super(props)
    }

    onSuccess(e) {
        const wall = e.data
        var newUserInst = {}
        if(!this.props.user.walls.includes(wall)){
            newUserInst = {
                ...this.props.user,
                walls: [
                    ...this.props.user.walls,
                    wall
                ],
                currentWall: wall,
            }
        }
        else {
            newUserInst = {
                ...this.props.user,
                currentWall: wall,
            }
        }
        socket.emit(actions.UPDATE_USER_INST, newUserInst) // DB + Redux
        this.props.navigation.navigate('rockwall', { wallID: wall })
    }

    render() {
        return (
            <QRCodeScanner
                topViewStyle={styles.container}
                bottomViewStyle={styles.container}
                onRead={this.onSuccess.bind(this)}
                topContent={
                    <Text style={styles.text}>Scan a wall's QR code</Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.text}>just hover the camera</Text>
                    </TouchableOpacity>
                }
            />
        )
    }
}
