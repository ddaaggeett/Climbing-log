import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from '../styles'

export default class User extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const wallsButtonText = this.props.user.name + '\'s walls'
        return (
            <View style={styles.container}>
                <Text style={[styles.text,styles.screenHeader]}>climber: {this.props.user.name}</Text>
                <Button title="QR Scanner" onPress={() => this.props.navigation.navigate('qrscanner')} />
                <Button title={wallsButtonText} onPress={() => this.props.navigation.navigate('allwalls')} />
            </View>
        )
    }
}
