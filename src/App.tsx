import React from 'react';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import MainHeader from './components/common/MainHeader/MainHeader';
import TopPage from './components/pages/TopPage/TopPage';
import Profile from './components/pages/Profile/Profile';
import ContextProvider from './utils/store/store';
import Container from './components/common/ui-library/Container/Container';

const AppContainer = styled(Container)`
  margin-top: 20px;
`;

const App: React.FC = () => (
  <ContextProvider>
    <div className="App">
      <BrowserRouter>
        <MainHeader />

        <AppContainer>
          <Switch>
            <Route exact path="/">
              <TopPage />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </AppContainer>
        <div className="footer">Here is my footer</div>
      </BrowserRouter>
    </div>
  </ContextProvider>
);

export default App;
