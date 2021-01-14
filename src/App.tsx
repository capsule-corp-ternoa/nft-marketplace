import React from 'react';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';

const TopPage: React.FC = () => (
  <>
    <p>test for test page</p>;
  </>
);

const DetailsPage: React.FC = () => (
  <div className="details">
    <p>test for details page</p>;
  </div>
);

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <header className="App-header">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/details">detaisl</Link>
          </li>
        </ul>
      </header>

      <div className="container">
        <Switch>
          <Route exact path="/">
            <TopPage />
          </Route>
          <Route path="/details">
            <DetailsPage />
          </Route>
        </Switch>
      </div>

      <div className="footer">Here is my footer</div>
    </BrowserRouter>
  </div>
);

export default App;
