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

  loadImages = async () => {
    const droppedResponse = await fetch('http://localhost:3000/dropped/', {
      method: 'POST',
      body: JSON.stringify({id: this.state.sessionId}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async(response) => {
      const resToJs = await response.json()
      return await resToJs
    })
    .then((resToJs) => {
      if (resToJs) {
        this.setState({
          images: resToJs.droppedImages,
          loaded: true
        })
      }
    })
    .catch(function(error) {
      throw(error)
    });
  }

  deleteImages = async () => {
    await fetch('http://localhost:3000/dropped/', {
      method: 'DELETE',
      body: JSON.stringify({id: this.state.sessionId}),
      headers: {
        'Content-Type': 'application/json'
      }
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

  sessionAuth = async (data) => {
    const sessionResponse =  await fetch('http://localhost:3000/session/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async(response) => {
      const resToJs = await response.json()
      return await resToJs
    })
    .then(async (resToJs) => {
      if (resToJs.wasSuccessful == true) {
        await this.setState({
          sessionId: resToJs.sessionId
        })
      }
    })
    .then(() => {
      this.loadImages()
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
          <Button
            title='Reload'
            onPress={() => this.loadImages()}
          />
          <FlatList
            data={this.state.images}
            renderItem = { ({item}) => this.renderItem(item) }
            keyExtractor={item => item._id}
            style = {styles.container}
            numColumns = {3}
          />
          <Button
            title='Delete Dropped Images'
            onPress={() => this.deleteImages()}
          />
          <View
          style={{marginVertical: 8, borderBottomColor: '#737373'}}
          ></View>
        </View>
        : <View style={{flex: 10}}>
          <Header
            centerComponent={{ text: 'DROPDOWN', style: { color: '#ffa' } }}
          />
          <Button
            title='Reload'
            onPress={() => this.loadImages()}
          />
          </View>
      : <SessionController sessionAuth={this.sessionAuth}/>
    )
  }
}

export default App
