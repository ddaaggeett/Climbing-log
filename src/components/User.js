import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    ScrollView,
    Image,
} from 'react-native';
import { styles } from '../styles'
import { stylesUser } from '../styles/user'

export default class User extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ScrollView endFillColor={'#47515b'}>
            <View style={styles.container}>
                <View style={stylesUser.userIDBar}>
                    <Image source={{ uri: this.props.user.avatar }} style={stylesUser.avatarImage} />
                    <View style={stylesUser.climberNameView}>
                        <Text style={[styles.text,stylesUser.climberName]}>{this.props.user.name}</Text>
                    </View>
                </View>
            </View>
            </ScrollView>
        )
    }
}
