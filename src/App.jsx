import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  TextEditor, ChildrenDemo, TraineeComponent, SignIn, InputDemo, NoMatch,
} from './pages';
import { AuthRoute, PrivateRoute } from './routes';


function App() {
  return (

    <Router>
      <CssBaseline>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <AuthRoute exact path="/login" component={SignIn} />
          <PrivateRoute exact path="/trainee" component={TraineeComponent} />
          <PrivateRoute exact path="/TextFieldDemo" component={TextEditor} />
          <PrivateRoute exact path="/ChildrenDemo" component={ChildrenDemo} />
          <PrivateRoute exact path="/InputDemo" component={InputDemo} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </CssBaseline>
    </Router>
  );
}

export default App;
