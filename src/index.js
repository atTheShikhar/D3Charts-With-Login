import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom';
import './index.css';
import LoginPage from './pages/LoginPage';
import ChartDashboard from './pages/ChartDashboard';
import PieDashboard from './pages/PieDashboard';

const authentication = {
  isLoggedIn: false,
  onAuthentication() {
    this.isLoggedIn=true;
  },
  getLoginStatus() {
    return this.isLoggedIn;
  }
};

function SecuredRoute(props) {
  return(
    <Route path={props.path} render={data => 
      authentication.getLoginStatus() ? 
        (<props.component {...data}></props.component>): 
        (<Redirect to={{pathname: '/'}}></Redirect>)}>
    </Route>
  )
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact render={props => <LoginPage {...props} authentication={authentication}/>} />
      <SecuredRoute path="/column-chart" exact component={props => <ChartDashboard {...props} />} />
      <SecuredRoute path="/pie-chart" exact component={props => <PieDashboard {...props} />} />
      <Redirect to="/" />
    </Switch>
  </Router>,
  document.getElementById('root')
);
