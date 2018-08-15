import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'

export default class WallList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>wall list</Text>
            </View>
        )
    }
}
