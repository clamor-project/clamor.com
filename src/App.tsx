import React from 'react';
import {SignInComponent} from './components/signin/signin.component'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import {Navbar} from './components/navbar/navbar.component'

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Switch>
    
      <Route path='/login' component={SignInComponent}/>
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
