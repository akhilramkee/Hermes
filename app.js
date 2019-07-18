import React from 'react';
import { Icon }from "react-native-elements";
import { createStackNavigator,createDrawerNavigator , createAppContainer, DrawerItems, SafeAreaView} from 'react-navigation';
import Home from './src/Pages/Home';
import { StyleSheet } from 'react-native';

const MenuButton = ({ navigation })=>{
    return(
        <Icon
        raised
        size = {35}
        containerStyle ={{ top:20,left:5,zIndex:1000}}
        name ="menu"
        type = "FontAwesome"
        onPress = {()=> navigation.toggleDrawer()}
      />
    )
}

const Drawer = createDrawerNavigator({
    Home:{
        screen:Home,
        params:{
            title:'All'
        }
    },
    Politics:{
        screen:Home,
        params:{
            title:'Politics'
        }
    },
    Economics:{
        screen:Home,
        params:{
            title:'Economics'
        }
    },
    Entertainment:{
        screen:Home,
        params:{
            title:'Entertainment'
        }
    },
    Sports:{
        screen:Home,
        params:{
            title:'Sports'
        }
    },
    World:{
        screen:Home,
        params:{
            title:'World'
        }
    }
},{
        initialRouteName: 'Home',
        contentComponent:props=>  <DrawerItems {...props}/>,
        contentOptions:{
            itemsContainerStyle:{ top: 100 },
        }
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

const styles = StyleSheet.create({
    container:{
        top:100,
    }
})


export const App = createAppContainer(AppNavigator); 