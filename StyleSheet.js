import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 100
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: .5,
    height: Dimensions.get('window').width / 3
  }
});



export default StyleSheet
