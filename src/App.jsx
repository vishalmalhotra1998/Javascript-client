import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  TextEditor, ChildrenDemo, TraineeDetails, TraineeList, SignIn, InputDemo, NoMatch,
} from './pages';
import { AuthRoute, PrivateRoute } from './routes';
import { SnackBarProvider } from './contexts';
import client from './libs/apollo-client';


function App() {
  return (
    <SnackBarProvider>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </SnackBarProvider>
  );
}

export default App;
