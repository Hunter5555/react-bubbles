import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
       <nav className="nav">
       <h1>Bubbles</h1>
           <ul>
            <li>
            <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/bubblepage">Bubbles</Link>
            </li>
           </ul>
          </nav>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/bubblepage" component={BubblePage} />
				</Switch>
			</div>
		</Router>
  );
}

export default App;
