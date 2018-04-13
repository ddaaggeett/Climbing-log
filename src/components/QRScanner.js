import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'
import QRCodeScanner from 'react-native-qrcode-scanner'

export default class QRScanner extends Component {
    constructor(props) {
        super(props)
    }

    onSuccess(e) {
        Linking.openURL(e.data).catch(err => console.error('An error occured', err))
    }

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
                topContent={
                    <Text style={styles.centerText}>
                        Go to <Text>ddaaggeett.xyz</Text> on your computer and scan the QR code.
                    </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text>OK. Got it!</Text>
                    </TouchableOpacity>
                }
            />
        )
    }
}
