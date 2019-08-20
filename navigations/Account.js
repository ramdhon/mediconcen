import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { Account } from '../screens';
import { AppTitle } from '../components';
import { color } from '../config';

export default createStackNavigator({
  Account: {
    screen: Account,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (props) => <AppTitle {...props} />,
      headerStyle: {
        backgroundColor: color.background
      },
      headerTintColor: color.plain
    })
  }
})