import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles'

export default class RockWall extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    return (
        <View style={styles.container}>
            <Text>rock wall page</Text>
        </View>
    )
  }
}
