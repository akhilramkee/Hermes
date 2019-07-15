/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import Activity from './src/Component/Activity';
import CardPage from './src/Pages/CardPage';
import { getNews, RealmUpdate, RealmQuery } from './src/Component/data';

var ARTICLE = [];


export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoaded:false,
    }
  }
  
  async componentDidMount(){
    

    ARTICLE = await RealmQuery();
    if(ARTICLE){
      this.setState({isLoaded:true})
    }
    ARTICLE = await getNews();
    if(ARTICLE){
      this.setState({isLoaded:true})
    }

    await RealmUpdate(ARTICLE);
                       
  }

  render() {
    return (
      <View>
        {this.state.isLoaded === true &&
            <CardPage ARTICLE = {ARTICLE} />
        }
        {!this.state.isLoaded && 
          <Activity />
        }
      </View>
    );
  }
}
