import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './components';
import { ExceptionPotsPage, OverviewPage } from './pages';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main">
        <Switch>
          <Route exact path="/M7Dashboard/overview">
            <OverviewPage />
          </Route>
          <Route exact path="/M7Dashboard/exceptionPots">
            <ExceptionPotsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
