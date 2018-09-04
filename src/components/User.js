import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { styles } from '../styles'

export default class User extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ScrollView endFillColor={'#47515b'}>
            <View style={styles.container}>
                <Text style={[styles.text,styles.climberName]}>{this.props.user.id}</Text>
            </View>
            </ScrollView>
        )
    }
}
