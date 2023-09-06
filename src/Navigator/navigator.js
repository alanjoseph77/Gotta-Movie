import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../Constants/thems';
import SeeAll from '../Screens/SeeAll';
import Home from '../Screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/BottomScreens/HomeScreen';
import Shorts from '../Screens/BottomScreens/Shorts';
import Add from '../Screens/BottomScreens/Add';
import Search from '../Screens/BottomScreens/Search';
import Profile from '../Screens/BottomScreens/Profile';
import {HomeIcon,MagnifyingGlassIcon,LifebuoyIcon,VideoCameraIcon,PlusCircleIcon,UserCircleIcon} from 'react-native-heroicons/solid'
import ShortsCard2 from '../components/ShortsCard2';
import Cast from '../Screens/Cast';
import PersonScreen from '../Screens/PersonScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import ChangePassword from '../Screens/ChangePassword';
const Stack=createStackNavigator();
const Tab=createBottomTabNavigator();
const NavigatorScreen = () => {
  return (
    <Stack.Navigator>

<Stack.Screen name="Home"
    component={Home}
    options={{ headerShown: false, headerTintColor: "black", }}
    initialRoute={{ statusBarHidden: false }}/>
    <Stack.Screen name="Tab"
    component={MyTab}
    options={{ headerShown: false, headerTintColor: "black", }}
    initialRoute={{ statusBarHidden: false }}/>



<Stack.Screen name="ShortsCard2"
    component={ShortsCard2}
    options={{ headerShown: false, headerTintColor: "black", }}
    initialRoute={{ statusBarHidden: false }}/>
    <Stack.Screen name="cast"
    component={Cast}
    options={{ headerShown: false, headerTintColor: "black", }}
    initialRoute={{ statusBarHidden: false }}/>

<Stack.Screen name="PersonScreen"
    component={PersonScreen}
    options={{ headerShown: false, headerTintColor: "black", }}
    initialRoute={{ statusBarHidden: false }}/>

<Stack.Screen name="SeeAll"
    component={SeeAll}
    options={{ headerShown: false, headerTintColor: "black", }}
    initialRoute={{ statusBarHidden: false }}/>
<Stack.Screen name="FavoritesScreen"
    component={FavoritesScreen}
    options={{ headerShown: false, headerTintColor: "black", }}
    initialRoute={{ statusBarHidden: false }}/>
    <Stack.Screen name="SignUp"
    component={SignUp}
    options={{ headerShown: false, headerTintColor: "black", }}
    initialRoute={{ statusBarHidden: false }}/>
    <Stack.Screen name="Login"
    component={Login}
    options={{ headerShown: false, headerTintColor: "black", }}
    initialRoute={{ statusBarHidden: false }}/>
    <Stack.Screen name="ChangePassword"
    component={ChangePassword}
    options={{ headerShown: false, headerTintColor: "black", }}
    initialRoute={{ statusBarHidden: false }}/>
  </Stack.Navigator>
  
  )
}
function MyTab(){
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarIcon: ({ focused, color, size }) => heroicons(route, focused),
      tabBarStyle: {
        backgroundColor: COLORS.gold,
        marginBottom: 28,
        borderRadius: 10,
        marginHorizontal: 20,
        height: 55,
        marginLeft: 20,
        marginRight: 20,
      },
    })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen}
      options={{ headerShown: false, headerTintColor: "black", }}
      initialRoute={{ statusBarHidden: false }}/>
      <Tab.Screen name="Shorts" component={Shorts}
      options={{ headerShown: false, headerTintColor: "black", }}
      initialRoute={{ statusBarHidden: false }}/>
      <Tab.Screen name="Add" component={Add}
      options={{ headerShown: false, headerTintColor: "black", }}
      initialRoute={{ statusBarHidden: false }}/>
      <Tab.Screen name="Search" component={Search}
      options={{ headerShown: false, headerTintColor: "black", }}
      initialRoute={{ statusBarHidden: false }}/>
      <Tab.Screen name="Profile" component={Profile}
      options={{ headerShown: false, headerTintColor: "black", }}
      initialRoute={{ statusBarHidden: false }}/>
    </Tab.Navigator>

  )
}

const heroicons = (route, focused) => {
  const commonIconStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: focused ? COLORS.white : COLORS.gold,
  };

  let icon;
  if (route.name == 'HomeScreen') {
    icon = focused ? (
      <HomeIcon size={20} color={COLORS.gold} />
    ) : (
      <HomeIcon size={20} color="white" strokeWidth={2} />
    );
  } else if (route.name == 'Shorts') {
    icon = focused ? (
      <VideoCameraIcon size={20} color={COLORS.gold} />
    ) : (
      <VideoCameraIcon size={20} color="white" strokeWidth={2} />
    );
  } else if (route.name == 'Add') {
    icon = (
      <View style={{ width: 60, height: 60, borderRadius: 108, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center',position:'absolute' }}>
        {focused ? <PlusCircleIcon size={100} color={COLORS.gold} /> : <PlusCircleIcon size={70} color={COLORS.gold} strokeWidth={2} />}
      </View>
    );
  }else if (route.name == 'Search') {
    icon = focused ? (
      <MagnifyingGlassIcon size={20} color={COLORS.gold} />
    ) : (
      <MagnifyingGlassIcon size={20} color="white" strokeWidth={2} />
    );
  }else if (route.name == 'Profile') {
    icon = focused ? (
      <UserCircleIcon size={20} color={COLORS.gold} />
    ) : (
      <UserCircleIcon size={20} color="white" strokeWidth={2} />
    );
  }

  return (
    <View style={commonIconStyle}>
      {icon} 
    </View>
  );
};

export default NavigatorScreen

const styles = StyleSheet.create({})