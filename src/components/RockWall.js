import React, { Component } from 'react';
import { Text, View, TextInput, Switch, ScrollView } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'
import {
    serverIP,
    serverPort,
} from '../config'
import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://' + serverIP + ':' + serverPort)

export default class RockWall extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleToggleWallSuccess = (value) => {
        const newUserInst = {
            ...this.props.user,
            walls: [
                {
                    ...this.props.user.walls[0],
                    succeeded: value
                },
                ...this.props.user.walls.slice(1)
            ]
        }
        socket.emit(actions.UPDATE_USER_INST, newUserInst)
    }
    render() {
        if(this.props.user.walls != undefined) return (
            <ScrollView endFillColor={'#47515b'}>
            <View style={styles.container}>
                <Text style={[styles.text,styles.wallID]}>{this.props.user.walls[0].id}</Text>
                <Text style={[styles.text,styles.wallSubInfo]}>@ {this.props.user.walls[0].gym}</Text>
                <Text style={styles.text}>Succeeded?</Text>
                <Switch onValueChange = {this.handleToggleWallSuccess}
                    value = {this.props.user.walls[0].succeeded} />
            </View>
            </ScrollView>
        )
        else return null // TODO: know how to render if props are not yet available (undefined)?
    }
}
