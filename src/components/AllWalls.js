import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'
import WallList from './WallList'

export default class AllWalls extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>all walls climbed by {this.props.user.name}</Text>
                <WallList {...this.props} />
            </View>
        )
    }
}
