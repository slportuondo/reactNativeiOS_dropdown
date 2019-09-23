import React from 'react'
import { TextInput, View, Button } from 'react-native'
import { Header } from 'react-native-elements'

class SessionController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionName: '',
      sessionKey: ''
    }
  }

  handleNameChange = (input) => {
    this.setState({
      sessionName: input
    })
  }

  handleKeyChange = (input) => {
    this.setState({
      sessionKey: input
    })
  }

  render() {
    return (
      <View style={{flex:10}}>
        <Header
          centerComponent={{ text: 'DROPDOWN', style: { color: '#ffa' } }}
        />
        <TextInput
          value = {this.state.sessionName}
          onChangeText = {this.handleNameChange}
          placeholder = 'Enter session name'
        />
        <TextInput
          value = {this.state.sessionKey}
          onChangeText = {this.handleKeyChange}
          placeholder = 'Activate Session'
        />
        <Button
          title='Enter Session'
          onPress={(props) => {
            this.props.sessionAuth(this.state)
          }}
        />
        <View
          style={{marginVertical: 8, borderBottomColor: '#737373'}}
        ></View>
      </View>
    )
  }
}

export default SessionController
