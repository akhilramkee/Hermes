/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Animated, StyleSheet} from 'react-native';
import Activity from '../Component/Activity';
import CardPage from './CardPage';
import { getNews, RealmUpdate, RealmQuery } from '../Component/data';
import Loader from 'react-native-mask-loader';
var ARTICLE = [];


export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      fadeIn: new Animated.Value(0),
      isLoaded:false,
      category:'All',
    }

  }
  
  async componentDidMount(){
  

    this.setState({
      category:this.props.navigation.state.params.title
    })

    ARTICLE = await RealmQuery(this.props.navigation.state.params.title);
    if(ARTICLE){
      this.setState({isLoaded:true})
    }

    if(this.state.isLoaded === true){
      Animated.timing(
        this.state.fadeIn,{
          toValue:1,
          duration:500
        }
      ).start();
    }

    ARTICLE = await getNews();
    if(ARTICLE){
      this.setState({isLoaded:true})
    }

    await RealmUpdate(ARTICLE);
  }

  render() {
    let { fadeIn } = this.state;
    return (
      <Animated.View
        style = {{
          opacity:{fadeIn}
        }}
      >
          <CardPage ARTICLE = {ARTICLE} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  loadingBackgroundStyle:{
    backgroundColor:'blue'
  }
})
