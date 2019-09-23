import React from 'react'
import { StyleSheet, Text, FlatList, Image, TouchableOpacity, View, Button } from 'react-native'
import { Header } from 'react-native-elements'
import styles from './StyleSheet.js'
import SessionController from './Session.js'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      sessionId: null,
      images: [],
      loaded: false,
      selected: []
    }
  }

  componentDidMount () {
    fetch('http://localhost:3000/dropped/')
      .then(async(response) => {
        const resToJs = await response.json()
        this.setState({
          images: resToJs.droppedImages,
          loaded: true
        })
      })
      .then(response => console.log('Request successful'))
      .catch(function(error) {
        throw(error)
      });
  }

  deletePhotos () {
    fetch('http://localhost:3000/dropped/', {
      method: 'DELETE'
    })
      .then(response => console.log(response))
      .then(
        this.setState({
          images: [],
          loaded: false,
          selected: []
        })
      )
      .catch(function(error) {
        throw(error)
      })
  }

  // saveDroppedImages (images) {
  //   images.forEach((image) => {
  //     CameraRoll.saveToCameraRoll(image.imgURI)
  //   })
  // }

  renderItem(image) {
    return (
      <TouchableOpacity style={{flex: 1/3 , aspectRatio: 1 }}>
        <Image
          style={{height: 120, width: 120}}
          source={{ uri: image.imgURI }}
          resizeMode='contain'/>
      </TouchableOpacity>
    )
  }

  sessionAuth =  (data) => {
    const sessionResponse =  fetch('http://localhost:3000/session/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async(response) => {
      const resToJs = await response.json()
      if (resToJs.wasSuccessful == true) {
        this.setState({
          sessionId: resToJs.sessionId,
          loaded: true
        })
      }
    })
    .catch(function(error) {
      throw(error)
    })
  }

  render() {

    return (
      this.state.sessionId != null
      ? this.state.loaded
        ? <View style={{flex: 10}}>
          <Header
            centerComponent={{ text: 'DROPDOWN', style: { color: '#ffa' } }}
          />
          <FlatList
            data={this.state.images}
            renderItem = { ({item}) => this.renderItem(item) }
            keyExtractor={item => item._id}
            style = {styles.container}
            numColumns = {3}
          />
          <Button
            title='Delete Dropped Photos'
            onPress={() => this.deletePhotos()}
          />
          <View
          style={{marginVertical: 8, borderBottomColor: '#737373'}}
          ></View>
        </View>
        : <Text>Hi</Text>
      : <SessionController sessionAuth={this.sessionAuth}/>
    )
  }
}

export default App
