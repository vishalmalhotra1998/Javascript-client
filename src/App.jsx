import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import {
  TextEditor, ChildrenDemo, TraineeRoutes, SignIn, InputDemo, NoMatch,
} from './pages/index';
import { AuthLayoutRoute, PrivateLayoutRoute } from './routes/index';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <AuthLayoutRoute exact path="/login" component={SignIn} />
        <PrivateLayoutRoute path="/Trainee" component={TraineeRoutes} />
        <PrivateLayoutRoute exact path="/TextFieldDemo" component={TextEditor} />
        <PrivateLayoutRoute exact path="/ChildrenDemo" component={ChildrenDemo} />
        <PrivateLayoutRoute exact path="/InputDemo" component={InputDemo} />
        <PrivateLayoutRoute component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
