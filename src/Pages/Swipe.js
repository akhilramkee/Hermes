
import React, { Component } from 'react';
import { View, PanResponder, Animated, Platform, UIManager, ToastAndroid } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH,SWIPE_OUT_DURATION,SWIPE_THRESHOLD } from '../Component/Constants';
import { getNews , RealmUpdate, RealmQuery} from '../Component/data';
import Content from '../Component/CardContent';
const Realm = require('realm');
import { ArticleSchema } from '../Component/Constants';

export default class Swipe extends Component {
  static defaultProps = {
    onSwipeDown: () => {},
    onSwipeUp: () => {},
    keyProp: 'id'
  };

  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.swipedCardPosition = new Animated.ValueXY({x:0,y:-SCREEN_HEIGHT})
    this.state = { index: 0 , pulledUp:true ,data:this.props.data, length:this.props.data.length};
    this._panResponder = {}
  }


   componentWillMount(){
    this._panResponder = PanResponder.create({

      onStartShouldSetPanResponder: () => false,
     
      onMoveShouldSetPanResponder: (e,gestureState) => {return !(gestureState.dx === 0 && gestureState.dy === 0)},
     
      onPanResponderMove: (evt, gesture) => {
        
        if(gesture.dy > 0 && this.state.index == 0){
          
          this.setState({pulledUp:true});
          
          if(gesture.dy<0.2 * SCREEN_HEIGHT){
          
            this.position.setValue({ x:0, y: gesture.dy });
          
          }else{
          
            this.position.setValue({ x:0, y: 0.2 * SCREEN_HEIGHT });
          
          }
        }
        else if(gesture.dy>0){
          
          this.swipedCardPosition.setValue({x:0,y:-SCREEN_HEIGHT+gesture.dy})
        
        }else{
          
          this.position.setValue({x:0,y:gesture.dy});
        
        }
          
      },

      onPanResponderRelease: (evt, gesture) => {
        
        if (gesture.dy > SWIPE_THRESHOLD && this.state.index>0) {
        
          this.forceSwipe('down');
        
        } else if (gesture.dy < -SWIPE_THRESHOLD && this.state.index<this.state.length-1) {
          
          if(this.state.pulledUp === true)
            this.setState({pulledUp:false});
          
          this.forceSwipe('up');
        
        } else {

          if(this.state.index === this.props.data.length-1 && gesture.dy < 0){
            ToastAndroid.show('You have read all new messages',ToastAndroid.SHORT)
            this.fetchMore();
          }
          else if(this.state.index === 0 && gesture.dy > 0){
            ToastAndroid.show('Refreshing',ToastAndroid.SHORT)
            this.fetchData();
          }
            
          this.resetPosition();
        
        }
      },
      
    });
  }

  async fetchMore(){
    Realm.open({schema:[ArticleSchema]})
          .then(realm=>{
            ARTICLE = realm.objects('Article');
          })
  }

  async fetchData(){

    let ARTICLE = await getNews();
    await RealmUpdate(ARTICLE);
    ARTICLE = await RealmQuery(this.props.category);
    if(ARTICLE !== this.state.data){
      this.setState({data:ARTICLE},()=>ToastAndroid.show("Refreshed",ToastAndroid.SHORT))
    }
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        index: 0
      })
    }
  }

  onSwipeComplete(direction) {

      const { onSwipeDown, onSwipeUp, data } = this.props;
      const item = (direction==='down')?data[this.state.index]:data[this.state.index];

      direction === 'down' ? onSwipeDown(item) : onSwipeUp(item);
      
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      
      if(direction==='down'){
      
          this.setState({ index: this.state.index - 1 });
          this.position.setValue({x:0, y:0});
          this.swipedCardPosition.setValue({x:0,y:-SCREEN_HEIGHT})
      
      }else{
         
          this.setState({ index: this.state.index + 1});
          this.position.setValue({ x: 0, y: 0 });
      }
  }

  forceSwipe(direction) {

      const y = direction === 'down' ? SCREEN_HEIGHT  : -SCREEN_HEIGHT;
      if(direction ==='down'){
          Animated.timing(this.swipedCardPosition, {
            toValue: { x:0, y:0 },
            duration: SWIPE_OUT_DURATION
          }).start(() => {
              this.onSwipeComplete(direction)
          });
      }else{
          Animated.timing(this.position,{
            toValue: {x:0, y},
            duration: SWIPE_OUT_DURATION
          }).start(()=> {
              this.onSwipeComplete(direction)
          });
      }
  }

  resetPosition() {
    
    Animated.parallel([
      Animated.spring(this.position, {
        toValue: { x: 0, y: 0 }
      }),
      Animated.spring(this.swipedCardPosition,{
        toValue: {x:0,y:-SCREEN_HEIGHT}
      })
    ]).start();
  
  }

  getCardStyle() {
    const { position } = this;

    return {
      ...position.getLayout(),
    };
  }

  renderCards = () => {
    
    const deck = this.state.data.map((item, i) => {
      if(i == this.state.index-1){
            return(
              <Animated.View
                key = { item[this.props.keyProps]}
                style={[this.swipedCardPosition.getLayout(),styles.cardStyle,{zIndex:99}]}
                {...this._panResponder.panHandlers}
              >
                <Content data = {item} />
              </Animated.View>
            )
      }
      else if (i<this.state.index){
            return(
              null  
            )
      } else if (i === this.state.index) {
            return (
              <Animated.View
                key={item[this.props.keyProp]}
                style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
                {...this._panResponder.panHandlers}
              >
                <Content data = { item } />
              </Animated.View>
        );
      }else if(!this.state.pulledUp){
        return(
              <Animated.View
              key = { item[this.props.keyProps]}
              style={[styles.cardStyle,{zIndex:99}]}
              {...this._panResponder.panHandlers}
            >
              <Content data = { item } />
            </Animated.View>
        )}else{
          return(
              <Animated.View style={[{backgroundColor:'black'},styles.cardStyle]}>

              </Animated.View>
          )
        }
    });

    return Platform.OS === 'android' ? deck.reverse() : deck.reverse();
  
  };

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  }
};
