import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles'

export default class User extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.whatPage}>USER ACCOUNT PAGE</Text>
                <Text style={styles.counterText}>redux only = {this.props.local.count}</Text>
                <Text style={styles.counterText}>rethinkDB + redux = {this.props.db.count}</Text>
        </View>
    )
  }
}
