import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Contact,MyProfile, MyAdmin, Overview } from "./components";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <div><Home /> </div>} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/contact" exact component={() => <Contact />} />
            <Route path="/MyProfile" exact component={() => <MyProfile />} />
            <Route path="/MyAdmin" exact component={() => <MyAdmin />} />
            <Route path="/overview" exact component={() => <Overview />} />
          </Switch>
          {/* <Footer /> */}
        </Router>
      </div>
    );
  }
}

export default App;
