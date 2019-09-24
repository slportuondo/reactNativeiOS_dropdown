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
      <View style={{flex:10, textAlign: 'center', alignItems: 'center'}}>
        <Header
          centerComponent={{ text: 'DROPDOWN', style: { color: '#ffa' } }}
        />
        <View
          style={{marginVertical: 140}}
        ></View>
        <TextInput
          style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, textAlign: 'center'}}
          value = {this.state.sessionName}
          onChangeText = {this.handleNameChange}
          placeholder = 'Session Name'
        />
        <TextInput
          style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, textAlign: 'center'}}
          value = {this.state.sessionKey}
          onChangeText = {this.handleKeyChange}
          placeholder = 'Session Key'
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
