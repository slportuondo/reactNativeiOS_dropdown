import React from 'react';
import { StyleSheet, Text, FlatList, Image, TouchableOpacity, View, Button } from 'react-native';
import { Header } from 'react-native-elements'
import styles from './StyleSheet.js'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      images: [{imgURI: 'data:image/jpeg;base64,/9j/temp'}],
      loaded: false
    }
  }

  componentDidMount () {
    fetch('http://localhost:3000/dropped/')
      .then(async(response) => {
        const resToJson = await response.json()
        this.setState({
          images: resToJson.droppedImages,
          loaded: true
        })
      })
      .then((response) => {
        console.log('Request successful');
      })
      .catch(function(error) {
        throw(error)
      });
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

  render() {
    return (
      <View style={{flex: 10}}>
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
          title='Drop Selected'
          onPress={() => null}
        ></Button>
        <View
        style={{marginVertical: 8, borderBottomColor: '#737373'}}
        ></View>
      </View>
    )
  }
}

export default App
