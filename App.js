/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text,View, ToastAndroid} from 'react-native';
import Activity from './src/Component/Activity';
import CardPage from './src/Pages/CardPage';
import { getNews } from './src/Component/data';
import axios from 'axios';
const Realm = require('realm');

var ARTICLE = [];
const ArticleSchema = {
  name: 'Article',
  properties: {
    id:'string',
    uri: 'string',
    title:'string',
    story: {type: 'string?[]'},
  }
};

export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoaded:false,
    }
  }
  
  async componentDidMount(){
    
  Realm.open({schema:[ArticleSchema]})
        .then(realm =>{
          if(realm.objects('Article')){
            ARTICLE = realm.objects('Article');
            this.setState({isLoaded:true});
          }else{
            ARTICLE = [];
          }
        })
        .catch(err =>{
          alert(err);
        })
  ARTICLE = await getNews();
    if(ARTICLE){
      this.setState({isLoaded:true})
    }
  ARTICLE = JSON.parse(ARTICLE);

    Realm.open({schema: [ArticleSchema]})
    .then(realm => {
      // Create Realm objects and write to local storage
      realm.write(() => {
        ARTICLE.forEach(obj =>{
          realm.create('Article',obj);
        })
      });
    })
                       
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
