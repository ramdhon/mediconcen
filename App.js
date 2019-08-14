import React from 'react';
import { createAppContainer } from 'react-navigation';

import { Switch } from './navigations';

const App = () => {
  const Route = createAppContainer(Switch);

  return (
    <Route />
  )
}

export default App;
