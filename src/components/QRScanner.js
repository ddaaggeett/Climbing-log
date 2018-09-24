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

    onSuccess(e) {
        const wall = JSON.parse(e.data)
        const newWallObject = {
            id: wall.id,
            gym: wall.gym,
            succeeded: false,
        }
        var newUserInst = {}
        if(this.props.user.walls == undefined) { // first wall
            newUserInst = {
                ...this.props.user,
                walls: [
                    newWallObject
                ],
            }
        }
        else { // not first wall
            const userWallIndex = findUserWallIndex(wall.id, this.props.user.walls)
            if(userWallIndex == null) { // wall doesn't exist yet - add to front
                newUserInst = {
                    ...this.props.user,
                    walls: [
                        newWallObject,
                        ...this.props.user.walls,
                    ],
                }
            }
            else { // wall exists, update to front
                newUserInst = {
                    ...this.props.user,
                    walls: [
                        this.props.user.walls[userWallIndex],
                        ...this.props.user.walls.slice(0, userWallIndex),
                        ...this.props.user.walls.slice(userWallIndex + 1),
                    ],
                }
            }
        }
        socket.emit(actions.UPDATE_USER_INST, newUserInst)
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
