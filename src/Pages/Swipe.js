
import React, { Component } from 'react';
import { View, Text, PanResponder, Dimensions, Animated, Platform, UIManager, LayoutAnimation, Button } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_HEIGHT;
const SWIPE_OUT_DURATION = 250;

export default class Swipe extends Component {
  static defaultProps = {
    onSwipeDown: () => {},
    onSwipeUp: () => {},
    keyProp: 'id'
  };

  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.state = { index: 0 };
    this._panResponder = {}
  }


    componentWillMount(){
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => {return !(gestureState.dx === 0 && gestureState.dy === 0)},
      onPanResponderMove: (evt, gesture) => {
        this.position.setValue({ x:0, y: gesture.dy });
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx != 0 && gestureState.dy != 0;
      },
      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dy > SWIPE_THRESHOLD) {
          this.forceSwipe('down');
        } else if (gesture.dy < -SWIPE_THRESHOLD) {
          this.forceSwipe('up');
        } else {
          this.resetPosition();
        }
      },
      
    });
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
    const item = data[this.state.index];

    direction === 'down' ? onSwipeDown(item) : onSwipeUp(item);
    this.position.setValue({ x: 0, y: 0 });
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
      this.setState({ index: this.state.index + 1 });
  }

  forceSwipe(direction) {
    const y = direction === 'down' ? SCREEN_HEIGHT  : -SCREEN_HEIGHT;
    Animated.timing(this.position, {
      toValue: { x:0, y },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this;

    return {
      ...position.getLayout(),
    };
  }

  renderCards = () => {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    const deck = this.props.data.map((item, i) => {
       if (i<this.state.index){
        return null
      } else if (i === this.state.index) {
        return (
          <Animated.View
            key={item[this.props.keyProp]}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {...this._panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      // const test = 20 * (i - this.state.index);
      // console.log('test', test)

      return (
        <Animated.View
          key={item[this.props.keyProp]}
          style={[styles.cardStyle, { top: 10 * (i - this.state.index)}]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
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
    width: SCREEN_WIDTH
  }
};
