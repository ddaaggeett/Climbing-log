import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Linking } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'
import QRCodeScanner from 'react-native-qrcode-scanner'

export default class QRScanner extends Component {
    constructor(props) {
        super(props)
    }

    onSuccess(e) {
        // Linking.openURL(e.data).catch(err => console.error('An error occured', err))
        this.props.navigation.navigate('rockwall', { wallID: e.data })
    }

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text>scan your wall's QR code</Text>
                    </TouchableOpacity>
                }
            />
        )
    }
}
