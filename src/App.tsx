import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { store } from './store';
import { NavComponent } from './components/nav/nav.component';
import userComponent from './components/users/user.component';
import groupsComponent from './components/groups/groups.component';
import groupSearchComponent from './components/groups/group-search/group-search.component';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
    
      <div className="App">
        <NavComponent/>
          <Switch>
            <Route path='/users' component={userComponent}/> 
            <Route path='/browse' component={groupSearchComponent} />
            <Route path='/groups/:id' component={groupsComponent} />
          </Switch>
      </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
