import React, { Component } from 'react';
import { Text, View, TextInput, Switch } from 'react-native';
import { styles } from '../styles'

export default class RockWall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wall: this.props.navigation.state.params.wallID,
            setter: 'setterID',
            grade: '',
        }
    }
    handleToggleWallSuccess = (value) => {
        this.setState({
            succeeded: value
        })
    }
    componentWillMount() {
        this.handleWallScan()
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.text,styles.screenHeader]}>wall: {this.state.wall}</Text>
                <Text style={styles.text}>Climber: {this.props.user.name}</Text>
                <Text style={styles.text} className='succeeded'>Succeeded?</Text>
                <Switch className='succeeded'
                    onValueChange = {this.handleToggleWallSuccess}
                    value = {this.state.succeeded} />
            </View>
        )
    }

    handleWallScan() {

    }
}
