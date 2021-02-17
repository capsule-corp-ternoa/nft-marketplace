import React from 'react';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import ContextProvider from './utils/store/store';
import MainHeader from './components/common/MainHeader/MainHeader';
import Footer from './components/common/Footer/Footer';
import TopPage from './components/pages/TopPage/TopPage';
import ConnectWalletPage from './components/pages/ConnectWalletPage/ConnectWalletPage';
import Profile from './components/pages/Profile/Profile';
import NftDetailsPage from './components/pages/NftDetailsPage/NftDetailsPage';
import CreateCollectiblePage from './components/pages/CreateCollectiblePage/CreateCollectiblePage';
import CreateSingleOrMultiplePage from './components/pages/CreateSingleOrMultiplePage/CreateSingleOrMultiplePage';
import SearchPage from './components/pages/SearchPage/SearchPage';

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
            <Route exact path="/" component={TopPage} />
            <Route exact path="/details" component={NftDetailsPage} />
            <Route path="/profile" component={Profile} />
            <Route path="/create" component={CreateCollectiblePage} />
            <Route path="/connect-wallet" component={ConnectWalletPage} />
            <Route path="/search" component={SearchPage} />
            <Route
              path="/create-single-collectible"
              render={(props) => (
                <CreateSingleOrMultiplePage {...props} multiple={false} />
              )}
            />
            <Route
              path="/create-multiple-collectible"
              render={(props) => (
                <CreateSingleOrMultiplePage {...props} multiple={true} />
              )}
            />
          </Switch>
        </AppContainer>
        <Footer />
      </BrowserRouter>
    </div>
  </ContextProvider>
);

export default App;
