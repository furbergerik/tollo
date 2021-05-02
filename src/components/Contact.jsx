import { Component } from 'react';

class Contact extends Component {
  state ={
    users:[],
    user:{
      email:'',
      first_name:'',
      last_name:'',
      password:''


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

  getStore1TotSales =_ =>{
    fetch('http://tollo.duckdns.org:61338/store1/totSales')
    .then(response =>response.json())
    .then(data =>this.setState({store1TotSales:data}))
    .catch(err => console.error(err)) 
  }

  getStore2TotSales =_ =>{
    fetch('http://tollo.duckdns.org:61338/store2/totSales')
    .then(response =>response.json())
    .then(data =>this.setState({store2TotSales:data}))
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
    const {user}=this.state;
    fetch(`http://tollo.duckdns.org:61338/add?email=${user.email}&first_name=${user.first_name}&last_name=${user.last_name}&password=${user.password}&username=${user.username}`)
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
      <div className="row">
      <div className=" col-xs-6 col-md-4 "></div>
      <form className=" col-xs-6 col-md-4 ">
      <div className="form-group">
    <label for="exampleInputUsername">Username:</label>
      <input type="text" className="form-control" id="exampleInputUserName" placeholder="Username"></input>
  </div>
      <div className="form-group"  >
    <label for="exampleInputEmail1">Email address:</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone but your employer.</small>
  </div>
 
  <div className="form-group">
    <label for="exampleInputPassword1">Password:</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
  </div>
  <label for="number">Name:</label>
  <div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text" id="">First and last name:</span>
  </div>
  <input type="text" class="form-control" placeholder="First Name"></input>
  <input type="text" class="form-control" placeholder="Last Name"></input>
</div>
  <div className="form-group">
    <label for="number">Phone Number:</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="0003332244"></input>
  </div>
  <label for="number">Which store do you work at?</label>
  <div class="input-group mb-3">
  <div class="input-group-prepend">
    <label class="input-group-text" for="inputGroupSelect01">Stores</label>
  </div>
  <select class="custom-select" id="inputGroupSelect01">
    <option selected>Choose...</option>
    <option value="1">Store One</option>
    <option value="2">Store Two</option>
    <option value="3">Store Three</option>
    <option value="4">Store Four</option>
    <option value="5">Store Five</option>
    
  </select>
</div>

 
  <div className="form-check">
    
    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    </div>

    );
  }
}

export default Contact;