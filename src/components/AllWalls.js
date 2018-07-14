import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'

export default class AllWalls extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gym: 'rock ventures'
        }
    }
    componentWillMount() {

    }
    render() {
        return (
            <View style={styles.container}>
                <Text>all walls</Text>
            </View>
        )
    }
}
