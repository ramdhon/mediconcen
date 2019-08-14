import { createSwitchNavigator } from 'react-navigation';

import { Login } from '../screens';
import Main from './Main';

export default createSwitchNavigator({
  Login: {
    screen: Login
  },
  Main: {
    screen: Main
  }
}, {
  initialRouteName: 'Main'
})