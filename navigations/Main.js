import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'native-base';

import Home from './Home';
import Account from './Account';
import { QRCode } from '../screens';
import { color } from '../config';

export default createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="home"
          style={{ color: tintColor }}
        />)
    }
  },
  QRCode: {
    screen: QRCode,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="qr-scanner"
          style={{ color: tintColor }}
        />)
    }
  },
  Account: {
    screen: Account,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="person"
          style={{ color: tintColor }}
        />)
    }
  }
}, {
  initialRouteName: "Home",
  tabBarOptions: {
    activeTintColor: color.active,
    inactiveTintColor: color.inactive,
  }
});
