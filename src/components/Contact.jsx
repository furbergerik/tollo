import { Component } from 'react';

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
      phone:123,
      email:''

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
      <div>{this.name()}</div>
    </div>
  );

  
  }
}

export default Contact;