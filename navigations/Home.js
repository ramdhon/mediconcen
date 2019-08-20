import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { Dashboard, FormPage } from '../screens';
import { AppTitle } from '../components';
import { color } from '../config';

export default createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (props) => <AppTitle {...props} />,
      headerStyle: {
        backgroundColor: color.background
      },
      headerTintColor: color.plain
    })
  },
  Form: {
    screen: FormPage,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (props) => <AppTitle {...props} />,
      headerStyle: {
        backgroundColor: color.background
      },
      headerTintColor: color.plain
    })
  },
  Detail: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (props) => <AppTitle {...props} />,
      headerStyle: {
        backgroundColor: color.background
      },
      headerTintColor: color.plain
    })
  }
}, {
  initialRouteName: 'Dashboard',
  navigationOptions: ({ navigation }) => ({
    headerTintColor: 'white',
  }),
})