import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

export default class Activity extends Component {
    render() {
      return (
        <View style={[styles.container, styles.horizontal]}>  
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:100,
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor:'powderblue'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })