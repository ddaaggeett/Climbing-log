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
                topViewStyle={styles.container}
                bottomViewStyle={styles.container}
                onRead={this.onSuccess.bind(this)}
                topContent={
                    <Text style={styles.text}>Scan a wall's QR code</Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.text}>just hover the camera</Text>
                    </TouchableOpacity>
                }
            />
        )
    }
}
