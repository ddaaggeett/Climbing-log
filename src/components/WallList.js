import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableHighlight } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'

export default class WallList extends Component {
    constructor(props) {
        super(props)
    }
    handlePressWall(wall) {
        this.props.navigation.navigate('rockwall', { wallID: wall.id })
    }
    render() {
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
