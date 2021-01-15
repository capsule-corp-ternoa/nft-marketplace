import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import MainHeader from './components/common/MainHeader/MainHeader';
import TopPage from './components/pages/TopPage/TopPage';
import Profile from './components/pages/Profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <MainHeader />

      <Container>
        <Switch>
          <Route exact path="/">
            <TopPage />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Container>
      <div className="footer">Here is my footer</div>
    </BrowserRouter>
  </div>
);

export default App;
