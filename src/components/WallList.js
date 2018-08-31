import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableHighlight } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'
import { findUserWallIndex } from '../logic'
import QRScanner from './QRScanner'
import rnConfig from '../../config/rnConfig' // TODO: use a single source for configs
import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://' + rnConfig.serverIP + ':' + rnConfig.socketPort)

export default class WallList extends Component {
    constructor(props) {
        super(props)
    }
    handlePressWall(wall) {
        const userWallIndex = findUserWallIndex(wall.id, this.props.user.walls)
        const newUserInst = {
            ...this.props.user,
            walls: [
                this.props.user.walls[userWallIndex],
                ...this.props.user.walls.slice(0, userWallIndex),
                ...this.props.user.walls.slice(userWallIndex + 1),
            ],
        }
        socket.emit(actions.UPDATE_USER_INST, newUserInst)
        this.props.swapWallView('singleWall')
    }
    render() {
        if(this.props.user.walls == undefined) {
            return (
                <Text style={[styles.text,styles.newHere]}>you must be{'\n'}new here</Text>
            )
        }
        return (
            <FlatList
                data={this.props.user.walls}
                renderItem={({item}) => (
                    <TouchableHighlight onPress={() => this.handlePressWall(item)}>
                    <Text style={[styles.text,styles.wallListItem]}>{item.id}</Text>
                    </TouchableHighlight>
                )}
                keyExtractor={(item, key) => item.id}
            />
        )
    }
}
