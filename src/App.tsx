import { useState } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./Nav";

import Venues from "./Venues";
import Routes from './Routes';
import Teams from './Teams';
import Players from './Players';
import Results from './Results';
import ResultsByDate from './ResultsByDate';
import Pools from './Pools';
import Stats from './Stats';
import Login from './Login';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/Routes" component={Routes} />
          <Route path="/Venues" component={Venues} />
          <Route path="/Teams" component={Teams} />
          <Route path="/Players" component={Players} />
          <Route path="/Results" component={Results} />
          <Route path="/ResultsByDate" component={ResultsByDate} />
          <Route path="/Pools" component={Pools} />
          <Route path="/Stats" component={Stats} />
          <Route path="/Login" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
