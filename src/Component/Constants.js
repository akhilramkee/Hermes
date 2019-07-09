import { Dimensions } from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SWIPE_THRESHOLD = 0.20 * SCREEN_HEIGHT;
export const SWIPE_OUT_DURATION = 250;
