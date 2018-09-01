import React, { Component } from 'react';
import { Text, View, TextInput, Switch } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'
import rnConfig from '../../config/rnConfig' // TODO: use a single source for configs
import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://' + rnConfig.serverIP + ':' + rnConfig.socketPort)

export default class RockWall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            setter: 'setterID',
            grade: '',
        }
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
            <View style={styles.container}>
                <Text style={[styles.text,styles.wallID]}>{this.props.user.walls[0].id}</Text>
                <Text style={styles.text}>Climber: {this.props.user.name}</Text>
                <Text style={styles.text}>Succeeded?</Text>
                <Switch onValueChange = {this.handleToggleWallSuccess}
                    value = {this.props.user.walls[0].succeeded} />
            </View>
        )
        else return null // TODO: know how to render if props are not yet available (undefined)?
    }
}
