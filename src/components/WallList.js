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
        console.log('this.props.user.walls\n' + this.props.user.walls)
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.user.walls}
                    renderItem={({wall}) => {
                        <TouchableOpacity onPress={() => this.handlePressWall(wall)}>
                            <Text>{wall}</Text>
                        </TouchableOpacity>
                    }}
                />
            </View>
        )
    }
}
