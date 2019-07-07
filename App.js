/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import CardPage from './src/Pages/CardPage';

const ARTICLE = [
  {id:'1', uri:require('./src/n2.jpeg'), story:['It is a long established fact that a reader will be distracted by the readable content of a page ','It is a long established fact that a reader will be distracted by the readable content of a page','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur']},
  {id:'2', uri:require('./src/n2.jpeg'), story:['It is a long established fact that a reader will be distracted by the readable content of a page ','It is a long established fact that a reader will be distracted by the readable content of a page','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur']},
  {id:'3', uri:require('./src/n2.jpeg'), story:['It is a long established fact that a reader will be distracted by the readable content of a page ','It is a long established fact that a reader will be distracted by the readable content of a page','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur']},
  {id:'4', uri:require('./src/n2.jpeg'), story:['It is a long established fact that a reader will be distracted by the readable content of a page ','It is a long established fact that a reader will be distracted by the readable content of a page','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur']}

]


export default class App extends Component{
  render() {
    return (
        <CardPage ARTICLE = {ARTICLE} />
    );
  }
}
