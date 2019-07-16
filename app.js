import React from 'react';
import { Icon }from "react-native-elements";
import { createStackNavigator,createDrawerNavigator , createAppContainer} from 'react-navigation';
import Home from './Home';
import { Platform } from 'react-native';

const MenuButton = ({ navigation })=>{
    return(
        <Icon
        containerStyle ={{ zIndex:1000}}
        name ="menu"
        type = "FontAwesome"
        onPress = {()=> navigation.toggleDrawer()}
      />
    )
}


const Drawer = createDrawerNavigator({
    Anime:{
        screen:Home,
        params:{
            title:'Anime'
        }
    },
    Weather:{
        screen:Home,
        params:{
            title:'Weather'
        }
    },
},{
        initialRouteName: 'Anime',
    }
);

const AppNavigator = createStackNavigator({
    Main:{
        screen:Drawer,
        navigationOptions:({navigation})=>({
            headerLeft:<MenuButton navigation = {navigation}/>,
            headerTransparent:true,
        })
    }
})


export const App = createAppContainer(AppNavigator); 