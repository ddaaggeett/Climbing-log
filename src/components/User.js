import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from '../styles'

export default class User extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>ACCOUNT PAGE: {this.props.db.userID}</Text>
                <Button title="QR Scanner" onPress={() => this.props.navigation.navigate('qrscanner')} />
                <Button title="All Walls" onPress={() => this.props.navigation.navigate('allwalls')} />
            </View>
        )
    }
}
