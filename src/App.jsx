import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-components';
import {
  TextEditor, ChildrenDemo, TraineeRoutes, Wrapper, InputDemo, NoMatch,
} from './pages';
import { AuthLayoutRoute, PrivateLayoutRoute } from './routes';
import { SnackBarProvider } from './contexts';
import client from './libs/apollo-client';


function App() {
  return (
    <SnackBarProvider>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <AuthLayoutRoute exact path="/login" component={Wrapper} />
            <PrivateLayoutRoute path="/Trainee" component={TraineeRoutes} />
            <PrivateLayoutRoute exact path="/TextFieldDemo" component={TextEditor} />
            <PrivateLayoutRoute exact path="/ChildrenDemo" component={ChildrenDemo} />
            <PrivateLayoutRoute exact path="/InputDemo" component={InputDemo} />
            <PrivateLayoutRoute component={NoMatch} />
          </Switch>
        </Router>
      </ApolloProvider>
    </SnackBarProvider>
  );
}

export default App;
