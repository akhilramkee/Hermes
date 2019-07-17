/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import Activity from '../Component/Activity';
import CardPage from './CardPage';
import { getNews, RealmUpdate, RealmQuery } from '../Component/data';
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
  
  /*  if(this.props.navigation.state.params.title){
      this.setState({category:this.props.navigation.state.params.title},()=>{
        if(this.state.category === 'All'){
          ARTICLE = RealmQuery();
        }
        else
          ARTICLE =  RealmQuery(this.state.category);
      });
    }*/
    this.setState({
      category:this.props.navigation.state.params.title
    })

    ARTICLE = await RealmQuery(this.props.navigation.state.params.title);
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
            <CardPage ARTICLE = {ARTICLE} category = {this.state.category}/>
        }
        {!this.state.isLoaded && 
          <Activity />
        }
      </View>
    );
  }
}
