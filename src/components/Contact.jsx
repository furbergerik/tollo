import { Component } from 'react';
//http://tollo.duckdns.org
//192.168.0.111
import Cookies from 'universal-cookie';
const cookies = new Cookies();
async function getStoreData(dataCategory='addSales', ID=0, storeNr='4') {
  console.log("yo");
  if (ID == 0) {
  
    var testForm='http://tollo.duckdns.org:61338/store'+'/getUsers?username='+cookies.get('username')
    var fetchingFrom = 'http://tollo.duckdns.org:61338/store' + storeNr + 'v2/' + dataCategory+'?jwt='+cookies.get('jwt')
    console.log(fetchingFrom);
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }else{

    return 0;      
  }
}

  async function login(username, password){
    console.log("login");
 
    //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
    //fetch(`http://tollo.duckdns.org:61338/login?username=${this.state.user.username}&password=${this.state.user.password}`)
    var fetchedData = await fetch(`http://tollo.duckdns.org:61338/login?username=${username}&password=${password}`);
    var response = await fetchedData.json();
    cookies.set ("username", {key: response[1]}, {path: '/'});
    cookies.set ("jwt", {key: response[4]}, {path: '/'});


    //.then(response => response.json())
    //.then(data=>cookies.set ("username", {key: data[1]}, {path: '/'}))
    //.then(data=>cookies.set ("jwt", {key: data[4]}, {path: '/'}))
    //.then(data=>cookies.set ('jwt', data[4], { path: '/' }))
    //.then(data=>console.log(data[4]))
    //.catch(err => console.error(err))
    

  }


class Contact extends Component {
  state ={
    users:[],
    user:{
      email:'',
      username:'',
      password:'',
      first_name:'',
      last_name:'',
      store:1,
      admin:0,
      phone:'123',
     
      // order of /add is: 
      

    },
    vegard:[],
    store1TotSales:[],
    store2TotSales:[]

  }
  props={
    olle:null

  }
  emailChangeHandler =(event) => {
    this.setState({user:{...this.state.user,email:event.target.value}});

  }
  usernameChangeHandler =(event) => {
    this.setState({user:{...this.state.user,username:event.target.value}});

  }
  passwordChangeHandler =(event) => {
    this.setState({user:{...this.state.user,password:event.target.value}});

  }
  first_nameChangeHandler =(event) => {
    this.setState({user:{...this.state.user,first_name:event.target.value}});

  }
  last_nameChangeHandler =(event) => {
    this.setState({user:{...this.state.user,last_name:event.target.value}});

  }
  storeChangeHandler =(event) => {
    this.setState({user:{...this.state.user,store:event.target.value}});

  }
  phoneChangeHandler =(event) => {
    this.setState({user:{...this.state.user,phone:event.target.value}});

  }
  submitHandler =(event) =>{
    event.preventDefault();
    console.log(this.state.user);
    event.target.className += " was-validated";
    this.addUser();
   // event.target.reset();

  }
   submitHandlerLogIn =async (event) =>{
    event.preventDefault();
    console.log(this.state.user);
    event.target.className += " was-validated";
    console.log("inne i submithandler");
    await login(this.state.user.username, this.state.user.password);

    const x = await getStoreData(); 
   // event.target.reset();

  }
  
  componentDidMount(){

  }

  addUser = _=>{
    console.log("wtf");
    //const {user}=this.state.user;
    console.log(this.state.user.username);
    //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
   // fetch(`http://tollo.duckdns.org:61338/add?username=${this.state.user.username}&password=${this.state.user.password}&first_name=${this.state.user.first_name}&last_name=${this.state.user.last_name}&store=${this.state.user.store}&admin=${this.state.user.admin}&phone=${this.state.user.phone}&email=${this.state.user.email}`)
   fetch(`http://tollo.duckdns.org:61338/add?username=${this.state.user.username}&password=${this.state.user.password}&first_name=${this.state.user.first_name}&last_name=${this.state.user.last_name}&store=${this.state.user.store}&admin=${this.state.user.admin}&phone=${this.state.user.phone}&email=${this.state.user.email}`) 
   .then(response => response.json())
    .then(data => console.log(data))
   // .then(this.getUser)
    .catch(err => console.error(err))
  }
  /*login =async _=>{
    console.log("login");
 
    //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
    //fetch(`http://tollo.duckdns.org:61338/login?username=${this.state.user.username}&password=${this.state.user.password}`)
    fetch(`http://tollo.duckdns.org:61338/login?username=${this.state.user.username}&password=${this.state.user.password}`)
    .then(response => response.json())
    //.then(data=>cookies.set ('jwt', data[4], { path: '/' }))
    .then(data=>console.log(data[4]))
    .catch(err => console.error(err))
    

  }*/

  cancelCourse = () => { 
    document.getElementById("reg-form").reset();
  }
 
   
  renderUser=({user_id,username}) => <div key={user_id}>{username}</div>
  render() {
    const{users, user}=this.state;
    return (
    
    <div className="App">
      {/* {users.map(this.renderUser)} */}
 
      {/* <div>{this.name()}</div> */}
      <br></br>
      <br></br>
      <div className="row ">
        {/* behöver hjälp med det här hur man får den till en sen! på små skärmar */}
      <div className=" col-xs-0 col-md-4 "></div>
      <form className="needs-validation" className=" col-xs-1 col-md-4  shadow p-3 mb-5 bg-white rounded" novalidate id="reg-form" onSubmit={this.submitHandler}>
      <h1 className="text-dark">Registration Form: </h1>
      <div className="form-group ">
    <label for="exampleInputUsername">Username:</label>
      <input type="text" className="form-control" id="exampleInputUserName" placeholder="Username" required
        onChange={(this.usernameChangeHandler)}></input>
            <div className="invalid-feedback">
                Please provide a valid city.
              </div>
              <div className="valid-feedback">Looks good!</div>
  </div>
      <div className="form-group "  >
    <label for="exampleInputEmail1">Email address:</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required
    onChange={(this.emailChangeHandler)}></input>   
  </div>
 
  <div className="form-group ">
    <label for="exampleInputPassword1">Password:</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required
    onChange={(this.passwordChangeHandler)}></input>

  </div>
  <label for="number">Name:</label>
  <div className="input-group ">
  
  <input type="text" className="form-control" placeholder="First Name" required
  onChange={(this.first_nameChangeHandler)}></input>
  <input type="text" className="form-control" placeholder="Last Name" required
  onChange={(this.last_nameChangeHandler)}></input>
</div>
  <div className="form-group ">
    <label for="number">Phone Number:</label>
    <input type="text" className="form-control" id="exampleInputPassword2" placeholder="0003332244" required
    onChange={(this.storeChangeHandler)}></input>
  </div>
  <label for="number">Which store do you work at?</label>
  <div className="input-group mb-3 ">
  <div className="input-group-prepend">
    <label className="input-group-text" for="inputGroupSelect01">Stores</label>
  </div>
  <select className="custom-select" id="inputGroupSelect01" required
  onChange={(this.storeChangeHandler)}>
    <option defaultValue>Choose...</option>
    <option value="1">Store One</option>
    <option value="2">Store Two</option>
    <option value="3">Store Three</option>
    <option value="4">Store Four</option>
    <option value="5">Store Five</option>
    
  </select>
</div>

 
  
  <button  className="btn btn-success btn-lg">Sign Up</button>
  <button  className="btn btn-warning btn-lg ml-3">Sign In</button>
      </form>
    </div>
    <div className="row ">
    <div className=" col-xs-0 col-md-4 "></div>
      <form className=" col-xs-1 col-md-4  shadow p-3 mb-5 bg-white rounded" onSubmit={this.submitHandlerLogIn.bind(this)}>
      <h1 className="text-dark">Login: </h1>
      <div className="form-group">
    <label for="exampleInputUsername1">Username:</label>
      <input type="text" className="form-control" id="exampleInputUserName1" placeholder="Username"
        onChange={(this.usernameChangeHandler)}></input>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword11">Password:</label>
    <input type="password" className="form-control" id="exampleInputPassword11" placeholder="Password"
    onChange={(this.passwordChangeHandler)}></input>

  </div>
  <button  className="btn btn-warning btn-lg ml-3">Sign In</button>
      </form>
      </div>
    </div>
  );

  
  }
}

export default Contact;