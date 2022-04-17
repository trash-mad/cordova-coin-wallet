import React from 'react';

import { Switch } from 'react-declarative';

import Scaffold from './components/Scaffold';

import routes from './routes';

import ioc from './lib/ioc';

const App = () => {
  return (
    <Scaffold>
      <Switch
        history={ioc.routerService}
        items={routes}
      />
    </Scaffold>
  ) 
}

export default App;
