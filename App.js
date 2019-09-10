import React from 'react';
import { StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
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
    console.log('COMPONENT NOW MOUNTED');
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


  renderItem(image) {
    return (
      <TouchableOpacity style={{flex: 1/3 , aspectRatio: 1 }}>
        <Image
          style={{height: 120, width: 120}}
          source={{ uri: image.imgURI }}/>
      </TouchableOpacity>
    )
  }

  render() {
    console.log('THIS IS STATE', this.state);
    return (
      <FlatList
        data={this.state.images}
        renderItem = { ({item}) => this.renderItem(item) }
        style = {styles.container}
        numColumns = {3}
      />
    )
  }
}

export default App
