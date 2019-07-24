/**
 * @format
 */

import {AppRegistry, NativeAppEventEmitter} from 'react-native';
import {App} from './app';
import {name as appName} from './app.json';
import bgMessaging from './bgMessaging';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('RNFirebaseBackgroundMessage',()=>bgMessaging);
