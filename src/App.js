import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation,Footer,Home, About, MyProfile, MyAdmin,  } from "./components";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function login(username, password) {

var fetchedData = await fetch(`http://tollo.duckdns.org:61338/login?username=${username}&password=${password}`);
 // var fetchedData = await fetch(`http://localhost:61139/login?username=${username}&password=${password}`);
//  var fetchedData = await fetch(`http://192.168.0.111:61339/login?username=${username}&password=${password}`);
  var response = await fetchedData.json();
  console.log(response);
  if(response[0]){
    cookies.set("username", { key: response[1] }, { path: '/' });
    cookies.set("jwt", { key: response[4] }, { path: '/' });
  }
  return response[0];
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout=this.handleLogout.bind(this);


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
      loggedIn: false 
      // order of /add is: 


    },
    flag: 1,

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

    console.log("inne i submithandler");
    var x = await login(this.state.user.username, this.state.user.password);

    console.log(cookies.get('jwt'))
    console.log(cookies.get('username'))

    if (!x) {
      this.setState({ flag: 2 })
      event.target.className += " invalid";
    } else {
      this.setState({ loggedIn: x });
      console.log("loggedIn = true, finns cookies: ", cookies.get('jwt'))
      event.target.className += " was-validated";
      this.setState({ flag: 1 })
    }
    // this.componentDidMount();
  }

  componentDidMount = () => {
    var x = (cookies.get('jwt'));
    console.log(x, " vår cookies");
    if (x !== undefined) {
      console.log("LoggedIn sätts till true")
      this.setState({ loggedIn: true })
    }
  }
  handleLogout  = () =>{
    console.log("det verkar fungera");
    this.setState({loggedIn:false});
    cookies.remove('jwt');
    cookies.remove('username');
    

  }


  render() {

    if (this.state.loggedIn == true) {
      return (
        <div className="App">
          <Router>
            <Navigation handleLogout={this.handleLogout}/>
            <Switch>
              <Route path="/" exact component={() => <div><Home  /> </div>} />
              <Route path="/about" exact component={() => <About />} />
              <Route path="/MyProfile" exact component={() => <MyProfile />} />
              <Route path="/MyAdmin" exact component={() => <MyAdmin />} />
              
             
            </Switch>
            {/* <Footer /> */}
          </Router>
        </div>
      );
    }
    else{
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

          <div className="container ">
          
            <div  className="tolloImage row align-items-center" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/tollo-small.png)` }}>

   
              <form className="tolloForm   shadow p-3  bg-white rounded" onSubmit={this.submitHandlerLogIn.bind(this)}>

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
                {this.state.flag === 2 && <p>Your username or password is wrong, please try again.</p>}
              </form>
             
              </div>
            </div>
          </div>
  

      );
    }
  }
}

export default App;
