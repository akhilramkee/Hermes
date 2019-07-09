import React , { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Share from 'react-native-share';
import  Swiper  from 'react-native-swiper';
import {captureScreen} from 'react-native-view-shot';
import  Swipe from './Swipe';
import {Icon} from 'react-native-elements';
import CacheImage from '../Component/CacheImage';
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../Component/Constants';
import ImageMarker from 'react-native-image-marker';

export default class CardPage extends Component{
    
    constructor(props){
      super(props)

      this.state = {
          bookmark : [],
          imageUri: '',
          showShare:true
      }

    }

    setbookmark = (id) =>{
      if(!(this.state.bookmark.includes(id))){
        this.setState({bookmark:[...this.state.bookmark,id]},()=>{alert(this.state.bookmark)})
      }else{
        this.setState({bookmark:this.state.bookmark.filter(item => item !=id)},()=>alert(this.state.bookmark))
      }
    }

    toggleShare = () =>{
      this.setState({showShare:false},()=>{
        this.handleShare();
        this.setState({showShare:true})
      });
    }

    handleShare = () =>{
      captureScreen({
        format: "jpg",
        quality: 1
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

    renderCards(item){
      return(
          <View style = {{ flex:1, position:'relative', height:SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor:'white'}} >
            <View style = {{ flex:0.5}}>
              <CacheImage uri={item.uri}
                  style = {styles.image}
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
                  <Text style={styles.heading}>{item.title}</Text>                            
                  <Text style={styles.text}>{data}</Text>
                  {this.state.showShare &&
                  <Icon
                    containerStyle={{position:'absolute',bottom:40,right:40}}
                    name='share'
                    type='FontAwesome'
                    onPress = {this.toggleShare}
                  />
                  }
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
          toggleShare = {this.toggleShare}
          state = {this.state}
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

  text:{
    lineHeight:35,
    fontSize:23,
    paddingTop:20,
    fontFamily:'sans-serif-medium'
  },

  heading:{
    fontWeight:'bold',
    lineHeight:45,
    fontSize:30,
    paddingTop:20,
    fontFamily:'Roboto',
    color:'black'
  },

  image:{
    flex:1,
    height:null,
    width:SCREEN_WIDTH,
    borderRadius:5
  }
})