import React , { Component } from 'react';
import  Swipe from './Swipe';

export default class CardPage extends Component{
    
    constructor(props){
      super(props)

      this.state = {
          bookmark : [],
          imageUri: '',
          showShare:true
      }

    }


    render(){
      return(
        <Swipe
          keyProps = "id"
          data = {this.props.ARTICLE}
        />
      )
    }
}
