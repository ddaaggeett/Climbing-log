import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import * as actions from '../actions'
import { findUserWallIndex } from '../logic'
import { styles } from '../styles'
import QRCodeScanner from 'react-native-qrcode-scanner'
import {
    serverIP,
    socketPort,
} from '../config'
import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://' + serverIP + ':' + socketPort)

export default class QRScanner extends Component {
    constructor(props) {
        super(props)
    }

    handleWallScan(wall) {
        const scanObject = {
            id: wall.id,
            climber_id: this.props.user.id,
        }
        socket.emit('wallScan', scanObject)
    }

    onSuccess(e) {
        //  TODO: QR code is to contain url to app store in addition to wall info
        const wall = JSON.parse(e.data)
        this.handleWallScan(wall)
        this.props.swapWallView('singleWall')
    }

    handleCancelScan() {
        this.props.swapWallView('allWalls')
    }

    render() {
        return (
            <QRCodeScanner
                topViewStyle={styles.container}
                bottomViewStyle={styles.container}
                onRead={this.onSuccess.bind(this)}
                topContent={
                    <TouchableHighlight onPress={() => this.handleCancelScan()}>
                    <Text style={[styles.text,styles.promptScan]}>CANCEL</Text>
                    </TouchableHighlight>
                }
                bottomContent={
                    <Text style={[styles.text,styles.promptScan]}>Scan a wall's QR code{'\n'}(just hover the camera)</Text>
                }
            />
        )
    }
}
