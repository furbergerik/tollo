import { Component } from 'react';
//http://tollo.duckdns.org
//192.168.0.111
class Contact extends Component {
  state ={
    users:[],
    user:{
      email:'',
      username:'',
      password:'',
      first_name:'',
      last_name:'',
      password:'',
      store:1,
      admin:0,
      phone:'123',
      email:''
      // order of /add is: 
      //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 

    },
    vegard:[],
    store1TotSales:[],
    store2TotSales:[]

  }
  props={
    olle:null

  }
  componentDidMount(){
   this.getUser();
   this.getJson();
   this.getStore1TotSales();
   this.getStore2TotSales();
  }
  getUser =_ =>{
    fetch('http://tollo.duckdns.org:61338/')
    .then(response =>response.json())
    .then(response =>this.setState({users:response.data}))
    .catch(err => console.error(err)) 
    console.log("yo");


  }
  getJson =_ =>{
    fetch('http://tollo.duckdns.org:61338/test')
    .then(response =>response.json())
    .then(data =>this.setState({vegard:data}))
    .catch(err => console.error(err)) 
  }

  async getStore1TotSales(){
    const response = await fetch('http://tollo.duckdns.org:61338/store1/totSales');
    const setOfData = await response.json();
    return setOfData;
  }
  

  /*getStore1TotSales =_ =>{
    fetch('http://tollo.duckdns.org:61338/store1/totSales')
    .then(response =>response.json())
    .then(data =>this.setState({store1TotSales:data}))
    .catch(err => console.error(err)) 
  }*/

  getStore2TotSales =_ =>{
    fetch('http://tollo.duckdns.org:61338/store2/totSales')
    .then(response =>response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err)) 
  }

  name() {
    console.log("kukens");
    console.log(this.state.vegard);
    console.log("Store 1 tot sales");
    console.log(this.state.store1TotSales);
    console.log("Store 2 tot sales");
    console.log(this.state.store2TotSales); 
  }
  addUser = _=>{
    const {user}=this.state.user;
    fetch(`http://tollo.duckdns.org:61338/add?username=${user.username}&password=${user.password}&first_name=${user.first_name}&last_name=${user.last_name}&password=${user.store}&password=${user.admin}&password=${user.phone}&email=${user.email}`)
    .then(response => response.json())
    .then(this.getUser)
    .catch(err => console.error(err))
    

  }
  renderUser=({user_id,username}) => <div key={user_id}>{username}</div>
  render() {
    const{users, user}=this.state;
    return (
    
    <div className="App">
      {/* {users.map(this.renderUser)} */}

      <div>
        <input value={user.email}
        onChange={e => this.setState({ user:{...user,email:e.target.value}})} />
         <input value={user.first_name}
        onChange={e => this.setState({ user:{...user,first_name:e.target.value}})} />
         <input value={user.last_name}
        onChange={e => this.setState({ user:{...user,last_name:e.target.value}})} />
         <input value={user.password}
        onChange={e => this.setState({ user:{...user,password:e.target.value}})} />
         <input value={user.username}
        onChange={e => this.setState({ user:{...user,username:e.target.value}})} />
        <button onClick={this.addUser}>Add user</button>

      </div>
      <div>{this.name()}</div>
      <br></br>
      <br></br>
      <div className="row ">
        {/* behöver hjälp med det här hur man får den till en sen! på små skärmar */}
      <div className=" col-xs-0 col-md-4 "></div>
      <form className=" col-xs-1 col-md-4  shadow p-3 mb-5 bg-white rounded">
      <div className="form-group">
    <label for="exampleInputUsername">Username:</label>
      <input type="text" className="form-control" id="exampleInputUserName" placeholder="Username"></input>
  </div>
      <div className="form-group"  >
    <label for="exampleInputEmail1">Email address:</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>   
  </div>
 
  <div className="form-group">
    <label for="exampleInputPassword1">Password:</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
  </div>
  <label for="number">Name:</label>
  <div className="input-group">
  
  <input type="text" className="form-control" placeholder="First Name"></input>
  <input type="text" className="form-control" placeholder="Last Name"></input>
</div>
  <div className="form-group">
    <label for="number">Phone Number:</label>
    <input type="text" className="form-control" id="exampleInputPassword2" placeholder="0003332244"></input>
  </div>
  <label for="number">Which store do you work at?</label>
  <div className="input-group mb-3">
  <div className="input-group-prepend">
    <label className="input-group-text" for="inputGroupSelect01">Stores</label>
  </div>
  <select className="custom-select" id="inputGroupSelect01">
    <option defaultValue>Choose...</option>
    <option value="1">Store One</option>
    <option value="2">Store Two</option>
    <option value="3">Store Three</option>
    <option value="4">Store Four</option>
    <option value="5">Store Five</option>
    
  </select>
</div>

 
  
  <button type="submit" className="btn btn-success btn-lg">Sign Up</button>
  <button  className="btn btn-warning btn-lg ml-3">Sign Up</button>
      </form>
  
    </div>
    </div>
  );

  
  }
}

export default Contact;