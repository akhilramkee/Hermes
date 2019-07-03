import React , { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, FlatList, Button, Alert, CameraRoll,PermissionsAndroid } from 'react-native';
import Share from 'react-native-share';
import  Swiper  from 'react-native-swiper';
import {captureScreen} from 'react-native-view-shot';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class CardPage extends Component{
    
    constructor(props){
      super(props)

      this.state = {
          bookmark : [],
          imageUri: ''
      }

    }

    requestExternalStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'My App Storage Permission',
            message: 'My App needs access to your storage ' +
              'so you can save your photos',
          },
        );
        return granted;
      } catch (err) {
        console.error('Failed to request permission ', err);
        return null;
      }
    };

    handleShare = () =>{
      this.requestExternalStoragePermission();
      captureScreen({
        format: "jpg",
        quality: 0.8
      })
      .then(
        uri => this.setState({imageUri:uri}),
        error => console.error("Oops, snapshot failed", error)
      );
        this.ShareImage();
    }

    ShareImage = () =>{
        let shareimage = {
          title:'React Native',
          url:this.state.imageUri,
          subject:'Share content',
          message:'News Brought forward by Datopsys'
        };
        Share.open(shareimage).catch(err=>console.log(err))
    }

    onPressBookmark = (itemId)=>{ 
      this.setState([...this.state.bookmark,itemId])
      Alert.alert(
        this.state.bookmark
      );
    };

    _keyExtractor = (item,index)=>item.id;

    _renderItem = ({item})=>(
      <View style = {{ flex:1, position:'relative', height:SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor:'white'}} >
      <View style = {{ flex:0.5 , backgroundColor:'white'}}>
        <Image source = { item.uri}
            style = {styles.image}
            resizeMode="cover"
        >
        </Image>
      </View>
     <Swiper>
        <View style = {styles.containerStyle}>
            <Text style={{lineHeight:35,fontSize:25}}>{item.story}</Text>
            <Button
            onPress={this.handleShare}
            title="Share"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
        </View>
        <View style = {styles.containerStyle}>
            <Text style={{lineHeight:35,fontSize:25}}>{item.story}</Text>
            <Button
            onPress={this.handleShare}
            title="Share"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
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