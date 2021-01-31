import React from 'react';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import ContextProvider from './utils/store/store';
import MainHeader from './components/common/MainHeader/MainHeader';
import Footer from './components/common/Footer/Footer';
import TopPage from './components/pages/TopPage/TopPage';
import Profile from './components/pages/Profile/Profile';
import CreateCollectiblePage from './components/pages/CreateCollectiblePage/CreateCollectiblePage';
import CreateSingleCollectiblePage from './components/pages/CreateSingleCollectiblePage/CreateSingleCollectiblePage';
import CreateMultipleCollectiblePage from './components/pages/CreateMultipleCollectiblePage/CreateMultipleCollectiblePage';

import Container from './components/common/ui-library/Container/Container';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';

const AppContainer = styled(Container)`
  margin-top: 20px;
`;

const App: React.FC = () => (
  <ContextProvider>
    <LoadingSpinner />
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
            <Route path="/create">
              <CreateCollectiblePage />
            </Route>
            <Route path="/create-single-collectible">
              <CreateSingleCollectiblePage />
            </Route>
            <Route path="/create-multiple-collectible">
              <CreateMultipleCollectiblePage />
            </Route>
          </Switch>
        </AppContainer>
        <Footer />
      </BrowserRouter>
    </div>
  </ContextProvider>
);

export default App;
