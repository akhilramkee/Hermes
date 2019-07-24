/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import CardPage from './CardPage';
import Activity from '../Component/Activity';
import { getNews, RealmUpdate, RealmQuery } from '../Component/data';
import SplashScreen from 'react-native-splash-screen'
import firebase from 'react-native-firebase';
//import firebase from '../Component/firebase.js';

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

    this.setState({
      category:this.props.navigation.state.params.title
    })

    ARTICLE = await RealmQuery(this.props.navigation.state.params.title);
    if(ARTICLE){
      this.setState({isLoaded:true})
      SplashScreen.hide();
    }
    ARTICLE = await getNews();
    if(ARTICLE){
      this.setState({isLoaded:true})
      SplashScreen.hide();
    }

    await RealmUpdate(ARTICLE);
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount(){
    this.notificationListener;
    this.notificationOpenedListener;
  }


  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log(fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken:', fcmToken);
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
  /*  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log('onNotification:');
      
        const localNotification = new firebase.notifications.Notification({
          sound: 'sampleaudio',
          show_in_foreground: true,
        })
        .setSound('sampleaudio.wav')
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
        .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
    });*/

    const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Hermes', firebase.notifications.Android.Importance.High)
      .setDescription('News Application')
    firebase.notifications().android.createChannel(channel);

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications.onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log('onNotificationOpened:');
      Alert.alert(title, body)
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('getInitialNotification:');
      Alert.alert(title, body)
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log("JSON.stringify:", JSON.stringify(message));
    });
  }

  render() {
    return (
      <View>
        {this.state.isLoaded &&
          <CardPage ARTICLE = { ARTICLE } category = {this.state.category} />
        }
      </View>
    );
  }
}
