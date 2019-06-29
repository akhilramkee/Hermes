import React , { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableHighlight, Alert} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';


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
      <View style = {{ flex:2 , backgroundColor:'black'}}>
        <Image source = { item.uri}
            style = {{ flex:1, height:null, width:null, resize:'center'}}
        >
        </Image>
      </View>
      <View style = {{ flex:3, padding:5 }}>
        <Text style={{lineHeight:35,fontSize:25}}>{item.story}</Text>
      </View>
      <View style={{ flex:1, position:'relative'}}>
        <TouchableHighlight
          onPress = { () => this.onPressBookmark(item.id)}
        >
          <Text style={{margin: 10, fontSize: 30, textAlign: 'left'}}>
            <FontAwesome>{Icons.bookmark }</FontAwesome> 
          </Text>
        </TouchableHighlight>
      </View>
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