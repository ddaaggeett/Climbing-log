import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import * as actions from '../actions'
import { styles } from '../styles'
import WallList from './WallList'
import QRScanner from './QRScanner'
import RockWall from './RockWall'

export default class AllWalls extends Component {
    constructor(props) {
        super(props)
        console.log('JSON.stringify(this.props,null,4)',JSON.stringify(this.props,null,4))
    }
    handleWallsTabPress() {
        this.props.swapWallView('allWalls')
    }
    render() {
        if(this.props.views.allWalls) {
            return (
                <View style={styles.container}>
                    <WallList {...this.props} />
                    <Button title="add new wall" onPress={() => this.props.swapWallView('scanner')} />
                </View>
            )
        }
        else if(this.props.views.scanner) {
            return (
                <QRScanner {...this.props} />
            )
        }
        else if(this.props.views.singleWall) {
            return (
                <RockWall {...this.props} />
            )
        }
    }
}
