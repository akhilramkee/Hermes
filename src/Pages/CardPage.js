import React , { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableHighlight, Alert} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import  Swiper  from 'react-native-swiper';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class CardPage extends Component{
    
    constructor(props){
      super(props)

      this.state = {
          bookmark : []
      }
    }

    onPressBookmark = (itemId)=>{ 
      this.setState([...this.state.bookmark,itemId])
      Alert.alert(
        this.state.bookmark
      );
    };

    _keyExtractor = (item,index)=>item.id;

    _renderItem = ({item})=>(
      <View style = {{ flex:1, position:'relative', height:SCREEN_HEIGHT, width: SCREEN_WIDTH}}>
      <View style = {{ flex:0.5 , backgroundColor:'black'}}>
        <Image source = { item.uri}
            style = {styles.image}
            resizeMode="cover"
        >
        </Image>
      </View>
      <Swiper>
        <View style = {styles.containerStyle}>
          <Text style={{lineHeight:35,fontSize:25}}>{item.story}</Text>
        </View>
        <View style = {styles.containerStyle}>
          <Text style={{lineHeight:35,fontSize:25}}>{item.story}</Text>
        </View>
        <View style = {styles.containerStyle}>
          <Text style={{lineHeight:35,fontSize:25}}>{item.story}</Text>
        </View>
      </Swiper>
  </View>
    );

    render(){
      return(
        <FlatList
          data = {this.props.ARTICLE}
          extradata = { this.state}
          _keyExtractor = { this._keyExtractor}
          renderItem = {this._renderItem}
        />
      )
    }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex:2,
    padding:10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom:20
  },

  image:{
    flex:1,
    height:null,
    width:SCREEN_WIDTH,
    borderRadius:5
  }
})