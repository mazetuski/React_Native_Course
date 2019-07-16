import React from 'react';
import Logo from './components/login/logo'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

// SCREENS
import Login from './components/login';
import Game from './components/game';
import News from './components/news';
import NewsArticle from './components/news/article';
import GameArticle from './components/game/article';

const headerConf = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#001338'
    },
    headerTintColor: '#fff',
    headerTitle: <Logo overrideStyle={{width: 75, height: 40}}/>
  }
};

const GameStack = createStackNavigator({
  Game,
  GameArticle,
}, headerConf);

const NewsStack = createStackNavigator({
  News,
  NewsArticle,
}, headerConf);

const AppStack = createBottomTabNavigator({
  NewsStack,
  GameStack,
}, {
  tabBarOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#00194b',
    inactiveBackgroundColor: '#001338',
    showLabel: false,
    style: {
      backgroundColor: '#001338'
    },
  },
  initialRouteName: 'NewsStack',
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      const { routeName } = navigation.state;
      let iconName = 'basketball';

      if (routeName === 'GameStack') {
        iconName = 'laptop';
      }

      return <Icons name={iconName} size={25} color={tintColor}/>
    }
  })
});

const LoginStack = createStackNavigator({
  Login,
}, {
  headerMode: 'none',
});

export const RootNavigator = () =>
  createAppContainer(createSwitchNavigator({
    App: AppStack,
    Login: LoginStack,
  }, {
    initialRouteName: 'Login',
  }))
;
