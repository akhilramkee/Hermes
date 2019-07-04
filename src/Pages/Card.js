import React,{ Component } from 'react';
import { View , Text, PanResponder, Dimensions, Animated, LayoutAnimation, UIManager} from 'react-native';
import { CardSwiper } from 'native-base';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SWIPE_THRESHOLD = 0.5 * SCREEN_HEIGHT;

const SWIPE_OUT_DURATION = 250;

class Card extends Component {
    static defaultProps  = {
        onSwipeUp:()=>{},
        onSwipeDown:()=>{},
        keyProps:'id'
    };

    constructor(props){
        super(props);
        this.position = new Animated.ValueXY();
        this.swipedCardPosition = new Animated.ValueXY({x:0,y:-SCREEN_HEIGHT});

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder:()=>true,
            onPanResponderMove:(evt,gesture)=>{
                this.position.setValue({x:gesture.dx,y:gesture.dy})
            },
            onPanResponderRelease:(evt,gesture)=>{
                if(gesture.dx>SWIPE_THRESHOLD){
                    this.forceSwipe('down');
                }else if(gesture.dx < -SWIPE_THRESHOLD){
                    this.forceSwipe('up');
                }else{
                    this.resetPosition();
                }
            }
        });

        this.state = { index: 0 };
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.data != this.props.data){
            this.setState({
                index:0
            })
        }
    }

    onSwipeComplete(direction){
        const { onSwipeUp, onSwipeDown, data } = this.props;
        const item = data[this.state.index];

        direction === 'down' ? onSwipeDown(item) : onSwipeUp(item);
        this.position.setValue({x:0,y:0});
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
        this.setState({
            index:this.state.index+1
        })
    }

    forceSwipe(direction){
        const y = direction === 'down'? SCREEN_HEIGHT:-SCREEN_HEIGHT;
        Animated.timing(this.position,{
            toValue: { x:0, y},
            duration: SWIPE_OUT_DURATION
        }).start(()=>{
            this.onSwipeComplete(direction);
        })
    }

    resetPosition(){
        Animated.spring(this.position,{
            toValue:{x:0,y:0}
        }).start();
    }

    renderCards = () =>{
        if(this.state.index >= this.props.data.length){
            return this.props.renderNoMoreCards();
        }

        const deck = this.props.data.map((item,i)=>{
            if(i<this.state.index){
                return null;
            }

            if(i === this.state.index ){
                return(
                    <Animated.View
                        key = { item[this.props.keyProps]}
                        style = {[styles.cardStyle,{zIndex:99}]}
                        {...this._panResponder.panHandlers}
                        >
                            {this.props.renderCard(item)}
                        </Animated.View>
                );
            }

            return(
                <Animated.View
                    key = { item[this.props.keyProps]}
                    style = { [styles.cardStyle,{top:10*(i-this.state.index)}]}
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        });
        return deck;
    };

    render(){
        return <View>{this.renderCards()}</View>
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
      height:SCREEN_HEIGHT,
      width:SCREEN_WIDTH
    }
  };

export default Card;
