/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import CardPage from './CardPage';
import Activity from '../Component/Activity';
import { getNews, RealmUpdate, RealmQuery } from '../Component/data';
import SplashScreen from 'react-native-splash-screen'

var ARTICLE = [];

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={
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
      SplashScreen.hide();
    }
    ARTICLE = await getNews();
    if(ARTICLE){
      this.setState({isLoaded:true})
      SplashScreen.hide();
    }

    await RealmUpdate(ARTICLE);
  }

  render() {
    return (
      <View>
        {this.state.isLoaded &&
          <CardPage ARTICLE = { ARTICLE } category = {this.state.category} />
        }
      </View>
    );
  }
}
