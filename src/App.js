import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Contact } from "./components";


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
        </Switch>
        <Footer />
      </Router>
      </div>
    );
  }
}

export default App;
