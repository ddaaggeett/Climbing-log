import React, { Component } from 'react';
import { Text, View, TextInput, Switch } from 'react-native';
import { styles } from '../styles'

export default class RockWall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            climber: 'userID',
            wall: this.props.navigation.state.params.wallID,
            setter: 'setterID',
            grade: '',
            succeeded: false,
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

                <Text>visitor # {this.wallvisits}</Text>

                <Text>Rock Wall ID: {this.state.wall}</Text>
                <Text className='succeeded'>Succeeded?</Text>
                <Switch className='succeeded'
                    onValueChange = {this.handleToggleWallSuccess}
                    value = {this.state.succeeded}
                    />
                <Text>Wall Setter: {this.state.setter}</Text>
                <TextInput
                    style={{height: 40}}
                    placeHolder="climber name"
                    onChangeText={(text) => this.setState({climber: text})}
                />
                <Text>Climber Name: {this.state.climber}</Text>

            </View>
        )
    }

    handleWallScan() {

    }
}
