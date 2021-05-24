import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, MyProfile, MyAdmin } from "./components";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function login(username, password) {

  var fetchedData = await fetch(`http://tollo.duckdns.org:61338/login?username=${username}&password=${password}`);
  //var fetchedData = await fetch(`http://192.168.0.111:61339/login?username=${username}&password=${password}`);
  var response = await fetchedData.json();
  console.log(response);
  cookies.set("username", { key: response[1] }, { path: '/' });
  cookies.set("jwt", { key: response[4] }, { path: '/' });
  return response[0];

}

class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    users: [],
    user: {
      email: '',
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      store: 1,
      admin: 0,
      phone: '123',

      // order of /add is: 


    },
    loggedIn: false
  }
  props = {
    olle: null
  }

  usernameChangeHandler = (event) => {
    this.setState({ user: { ...this.state.user, username: event.target.value } });

  }
  passwordChangeHandler = (event) => {
    this.setState({ user: { ...this.state.user, password: event.target.value } });

  }

  submitHandlerLogIn = async (event) => {
    event.preventDefault();
    console.log(this.state.user);
    event.target.className += " was-validated";
    console.log("inne i submithandler");
    var x = await login(this.state.user.username, this.state.user.password);
    this.setState({ loggedIn: x });
    this.componentDidMount();
  }

  componentDidMount = () => {
    var x = (cookies.get('jwt'));
    console.log(x);
    if (typeof x !== 'undefined') {
      this.setState({ loggedIn: true })
    }
  }



  render() {

    if (this.state.loggedIn) {
      return (
        <div className="App">
          <Router>
            <Navigation />
            <Switch>
              <Route path="/" exact component={() => <div><Home /> </div>} />
              <Route path="/about" exact component={() => <About />} />
              <Route path="/MyProfile" exact component={() => <MyProfile />} />
              <Route path="/MyAdmin" exact component={() => <MyAdmin />} />

            </Switch>
            {/* <Footer /> */}
          </Router>
        </div>
      );
    }
    else {
      return (


        <div className="App">
           {/* <img className="tolloImage" src={`${process.env.PUBLIC_URL}/tollo-small.png`}></img> */}
         
          {/* {users.map(this.renderUser)} */} 

          {/* <div>{this.name()}</div> */}
          <br></br>
          <br></br>
          <div className="row ">
            {/* behöver hjälp med det här hur man får den till en sen! på små skärmar */}
            <div className=" col-xs-3 col-md-4 "></div>
          </div>
         
          <div className="row ">
            <div className=" col-xs-3 col-md-3 "></div>
            <div>
          
            
            <form className="tolloForm col-xs-3 col-md-3  shadow p-3  bg-white rounded" onSubmit={this.submitHandlerLogIn.bind(this)}>
           
              <h1 className="text-dark">Login </h1>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Username:</label>
                <input type="text" className="form-control" id="exampleInputUserName1" placeholder="Username"
                  onChange={(this.usernameChangeHandler)}></input>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword11">Password:</label>
                <input type="password" className="form-control" id="exampleInputPassword11" placeholder="Password"
                  onChange={(this.passwordChangeHandler)}></input>

              </div>
              <button className="btn btn-warning btn-lg ml-3" onClick={this.props.onClick}>Sign In</button>
            </form>
            <img className="tolloImage d-none d-xl-block" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/tollo-small.png)`} }>
            </img>
            </div>
            </div>
            </div>
      
      );
    }
  }
}

export default App;
