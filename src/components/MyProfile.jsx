import { Component } from 'react';
//http://tollo.duckdns.org
//192.168.0.111
class MyProfile extends Component {
  state ={
    users:[],
    oldPassword:"",
    newPassword:"",
    oldNumber:"",
    newNumber:"",
    oldEmail:"",
    newEmail:""
  }
  props={
    olle:null

  }
  passwordChangeHandler =(event) => {
    this.setState({ [event.target.name]: event.target.value });

  }
  usernameChangeHandler =(event) => {
    this.setState({user:{...this.state.user,username:event.target.value}});

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
  
  componentDidMount(){

  }

  addUser = _=>{
    console.log("wtf");
    //const {user}=this.state.user;
    console.log(this.state.user.username);
    //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
    fetch(`http://tollo.duckdns.org:61338/add?username=${this.state.user.username}&password=${this.state.user.password}&first_name=${this.state.user.first_name}&last_name=${this.state.user.last_name}&store=${this.state.user.store}&admin=${this.state.user.admin}&phone=${this.state.user.phone}&email=${this.state.user.email}`)
    .then(response => response.json())
    .then(data => console.log(data))
   // .then(this.getUser)
    .catch(err => console.error(err))
  }
  login = _=>{
    console.log("login");
    //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
    fetch(`http://tollo.duckdns.org:61338/login?username=${this.state.user.username}&password=${this.state.user.password}`)
    .then(response => response.json())
    .then(data=>console.log(data))
    .catch(err => console.error(err))
    

  }
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
    <div className=" col-xs-0 col-md-4 "></div>
      <form className=" col-xs-1 col-md-4  shadow p-3 mb-5 bg-white rounded" onSubmit={this.submitHandler}>
      <h1 className="text-dark">Change Password: </h1>
      <div className="form-group">
    <label for="exampleInputUsername1">Current Password:</label>
      <input value={this.state.newPassword} type="password" className="form-control" id="exampleInputUserName1" placeholder="Password"
        onChange={(this.passwordChangeHandler)}></input>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword11">New Password:</label>
    <input value={this.state.newPassword} type="password" className="form-control" id="exampleInputPassword11" placeholder="New Password"
    onChange={(this.passwordChangeHandler)}></input>

  </div>
  <button  className="btn btn-warning btn-lg ml-3"onClick={this.login}>Sign In</button>
      </form>
      </div>
    </div>
  );

  
  }
}

export default MyProfile;