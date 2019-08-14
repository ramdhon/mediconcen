import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { Dashboard } from '../screens';
import { AppTitle } from '../components';
import { color } from '../config';

export default createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      headerTitle: (props) => <AppTitle {...props} />,
      headerStyle: {
        backgroundColor: color.background
      }
    }
  }
}, {
  initialRouteName: 'Dashboard'
})