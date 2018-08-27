import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'

export default class WallList extends Component {
    constructor(props) {
        super(props)
    }
    handlePressWall(some) {
        console.log('wall = ' + some)
    }
    render() {
        return (
            <FlatList
                data={this.props.user.walls}
                renderItem={({item}) => (
                    <Text style={styles.text}>{item.id}</Text>
                )}
                keyExtractor={(item, key) => item.id}
            />
        )
    }
}
