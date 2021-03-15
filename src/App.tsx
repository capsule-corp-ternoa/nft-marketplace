/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import './style/general.scss';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import MainHeader from './components/general/MainHeader/MainHeader';
import Landing from './components/pages/LandingPage/Landing';

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <MainHeader />
      <Switch>
        <Route path="/" exact render={() => <Landing />} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
