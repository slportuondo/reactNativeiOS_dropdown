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


  render() {
    console.log('THIS IS STATE', this.state);
    return (
      <Text>Working</Text>
    )
  }
}

export default App
