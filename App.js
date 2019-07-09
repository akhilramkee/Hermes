/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text,View} from 'react-native';
import Activity from './src/Component/Activity';
import CardPage from './src/Pages/CardPage';
import { getNews } from './src/Component/data';
import axios from 'axios';

const ARTICLE = [
  {id:'1', uri:'https://images-na.ssl-images-amazon.com/images/I/518t1mDOzlL.jpg', story:['It is a long established fact that a reader will be distracted by the readable content of a page ','It is a long established fact that a reader will be distracted by the readable content of a page','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur']},
  {id:'2', uri:'https://static2.srcdn.com/wordpress/wp-content/uploads/2019/03/Naruto-Cover.jpg', story:['It is a long established fact that a reader will be distracted by the readable content of a page ','It is a long established fact that a reader will be distracted by the readable content of a page','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur']},
  {id:'3', uri:'https://static2.srcdn.com/wordpress/wp-content/uploads/2019/03/Naruto-Cover.jpg', story:['It is a long established fact that a reader will be distracted by the readable content of a page ','It is a long established fact that a reader will be distracted by the readable content of a page','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur']},
  {id:'4', uri:'https://static2.srcdn.com/wordpress/wp-content/uploads/2019/03/Naruto-Cover.jpg', story:['It is a long established fact that a reader will be distracted by the readable content of a page ','It is a long established fact that a reader will be distracted by the readable content of a page','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur']}

]

export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoaded:true,
    }
  }
  
  async componentDidMount(){
    var imageUrl = [];
    ARTICLE.map((item,index)=>{
      imageUrl = [...imageUrl,item.uri];
    })
    console.log(imageUrl);
/*    const list = await getNews();
    if(list){
      this.setState({isLoaded:true})
    }*/                       
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
