import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import Amount from './components/finances/Amount'
import About from './components/dashboard/About'
import Account from './components/dashboard/Account'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path='/project/:id' component={ProjectDetails} />
          <Route path='/signin' component = {SignIn} />
          <Route path='/about' component = {About} />
          <Route exact path="/account" component={Account} />
          <Route path='/signup' component = {SignUp} />
          <Route path='/create' component = {CreateProject} />
          <Route path='/view-finances' component = {Amount} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
