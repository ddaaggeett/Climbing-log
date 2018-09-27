import React, { Component } from 'react'
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import { styles } from '../styles'
import { stylesCamera } from '../styles/camera'
import {
    serverIP,
    socketPort,
} from '../config'
import io from 'socket.io-client/dist/socket.io'
const socket = io.connect('http://' + serverIP + ':' + socketPort)

export default class WallCamera extends Component {
    constructor(props) {
        super(props)
    }

    takePicture = async function() {
        if(this.camera) {
            const options = {
                base64: true,
            }
            const data = await this.camera.takePictureAsync(options)
            this.props.swapWallView('singleWall')
            const newImageObject = {
                image: data.base64,
                wall_id: this.props.user.walls[0].id,
                user_id: this.props.user.id,
            }
            socket.emit('newWallImage', newImageObject)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={(cam) => { this.camera = cam }}
                    style={stylesCamera.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <TouchableOpacity
                    onPress={() => this.takePicture()}
                    style = {stylesCamera.capture} >
                    <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
