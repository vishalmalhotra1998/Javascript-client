import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  TextEditor, ChildrenDemo, TraineeDetails, TraineeList, SignIn, InputDemo, NoMatch,
} from './pages';
import { AuthRoute, PrivateRoute } from './routes';
import { SnackBarProvider } from './contexts';


function App() {
  return (
    <SnackBarProvider>
      <Router>
        <CssBaseline>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <AuthRoute exact path="/login" component={SignIn} />
            <PrivateRoute exact path="/trainee" component={TraineeList} />
            <PrivateRoute exact path="/trainee/:id" component={TraineeDetails} />
            <PrivateRoute exact path="/TextFieldDemo" component={TextEditor} />
            <PrivateRoute exact path="/ChildrenDemo" component={ChildrenDemo} />
            <PrivateRoute exact path="/InputDemo" component={InputDemo} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </CssBaseline>
      </Router>
    </SnackBarProvider>
  );
}

export default App;
