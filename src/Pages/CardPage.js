import React , { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, FlatList, Button, Alert, CameraRoll,PermissionsAndroid , ToastAndroid} from 'react-native';
import Share from 'react-native-share';
import  Swiper  from 'react-native-swiper';
import {captureScreen} from 'react-native-view-shot';
import  Swipe from './Swipe';
import {Icon} from 'react-native-elements';


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

    setbookmark = (id) =>{
      if(!(this.state.bookmark.includes(id))){
        this.setState({bookmark:[...this.state.bookmark,id]},()=>{alert(this.state.bookmark)})
      }else{
        this.setState({bookmark:this.state.bookmark.filter(item => item !=id)},()=>alert(this.state.bookmark))
      }
    }

    handleShare = () =>{

      captureScreen({
        format: "jpg",
        quality: 0.8
      })
      .then(
        uri => {this.setState({imageUri:uri},()=>{this.ShareImage()})},
        error => console.error("Oops, snapshot failed", error)
      );
      
    }

    ShareImage = () =>{
        let shareimage = {
          title:'React Native',
          url: this.state.imageUri,
          subject:'Share content',
          message:'News Brought forward by Datopsys'
        };
        Share.open(shareimage).catch(err=>console.log(err))
    }

    _keyExtractor = (item,index)=>item.id;

    renderCards(item){
      return(
          <View style = {{ flex:1, position:'relative', height:SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor:'white'}} >
            <View style = {{ flex:0.5 , backgroundColor:'white'}}>
              <Image source = { item.uri}
                  style = {styles.image}
                  resizeMode="cover"
              />
            </View>
          <Swiper>
              {
              item.story.map((data)=>(
              <View style = {styles.containerStyle} key={item.id}>
                  <Icon
                    containerStyle = {{ position:'absolute',top:0,right:20,zIndex:99}}
                    name='bookmark'
                    onPress = {()=>this.setbookmark(item.id)}
                  />                            
                  <Text style={{lineHeight:35,fontSize:25,paddingTop:20}}>{data}</Text>
                  <Icon
                    containerStyle={{position:'absolute',bottom:40,right:40}}
                    name='share'
                    type='FontAwesome'
                    onPress = {this.handleShare}
                  />
              </View>
          ))}
      </Swiper>
  </View>
      )}


    render(){
      return(
        <Swipe
          keyProps = "id"
          data = {this.props.ARTICLE}
          renderCard = { this.renderCards}
          handleShare = { this.handleShare }
          setbookmark = {this.setbookmark}
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