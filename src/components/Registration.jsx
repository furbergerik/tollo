import React, { Component } from 'react';
import './Registration.css';

  
class  Registration extends Component {
    Constructor(){
      this.regUserChangeHandler=this.regUserChangeHandler.bind(this);
    }
    state={
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        store: '',
        admin:0,
        department:''
     }
   
      regUserChangeHandler =(event) => {
        this.setState({ [event.target.name]: event.target.value });
    
      }
   
      addUser = _=>{
        console.log("wtf");
        //const {user}=this.state.user;
        console.log(this.state.department);
        //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
       // fetch(`http://tollo.duckdns.org:61338/add?username=${this.state.user.username}&password=${this.state.user.password}&first_name=${this.state.user.first_name}&last_name=${this.state.user.last_name}&store=${this.state.user.store}&admin=${this.state.user.admin}&phone=${this.state.user.phone}&email=${this.state.user.email}`)
     //fetch(`http://tollo.duckdns.org:61338/add?username=${this.state.username}&password=${this.state.password}&first_name=${this.state.first_name}&last_name=${this.state.last_name}&store=${this.state.store}&admin=${this.state.admin}&phone=${this.state.phone}&email=${this.state.email}`) 
     // fetch(`http://localhost:61339/add?username=${this.state.username}&password=${this.state.password}&first_name=${this.state.first_name}&last_name=${this.state.last_name}&store=${this.state.store}&admin=${this.state.admin}&phone=${this.state.phone}&email=${this.state.email}&department=${this.state.department}`) 
       fetch(`http://tollo.duckdns.org:61338/add?username=${this.state.username}&password=${this.state.password}&first_name=${this.state.first_name}&last_name=${this.state.last_name}&store=${this.state.store}&admin=${this.state.admin}&phone=${this.state.phone}&email=${this.state.email}&department=${this.state.department}`) 
       .then(response => response.json())
        .then(data => console.log(data))
       // .then(this.getUser)
        .catch(err => console.error(err))
      }
      submitHandler =(event) =>{
        event.preventDefault();
        console.log(this.state);
        event.target.className += " was-validated";
        this.addUser();
       // event.target.reset();
    
      }
    render() {
      return(
        <div>
        
      <form className="needs-validation"  className="shadow p-3 mb-5 rounded" id="test1"novalidate id="reg-form" onSubmit={this.submitHandler}>
      <h1 className="text-dark" >Registration Form: </h1>
      <div className="form-group " className="test1">
    <label for="exampleInputUsername">Username:</label>
      <input type="text" className="form-control" id="exampleInputUserName" placeholder="Username" required name="username"
        onChange={(this.regUserChangeHandler)}></input>
            <div className="invalid-feedback">
                Please provide a valid city.
              </div>
              <div className="valid-feedback">Looks good!</div>
  </div>
      <div className="form-group " className="test1" >
    <label for="exampleInputEmail1">Email address:</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required name="email"
    onChange={(this.regUserChangeHandler)}></input>   
  </div>
 
  <div className="form-group "className="test1">
    <label for="exampleInputPassword1">Password:</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required name="password"
    onChange={(this.regUserChangeHandler)}></input>

  </div>
  <label for="number">Name:</label>
  <div className="input-group ">
  
  <input type="text" className="form-control" placeholder="First Name" required  name="first_name"
  onChange={(this.regUserChangeHandler)}></input>
  <input type="text" className="form-control" placeholder="Last Name" required  name="last_name"
  onChange={(this.regUserChangeHandler)}></input>
</div>
  <div className="form-group "className="test1">
    <label for="number">Phone Number:</label>
    <input type="text" className="form-control" id="exampleInputPassword2" placeholder="0003332244" required name="phone"
    onChange={(this.regUserChangeHandler)}></input>
  </div>
  <label for="number">Which store do you work at?</label>
  <div className="input-group mb-3 ">
  <div className="input-group-prepend">
    <label className="input-group-text" for="inputGroupSelect01">Store:</label>
  </div>
  <select className="custom-select" id="inputGroupSelect01" required  name="store"
  onChange={(this.regUserChangeHandler)}>
    <option defaultValue>Choose...</option>
    <option value="1">Store One</option>
    <option value="2">Store Two</option>
    <option value="3">Store Three</option>
    <option value="4">Store Four</option>
    <option value="5">Store Five</option>
    
  </select>
</div>
<div className="input-group mb-3 ">
  <div className="input-group-prepend">
    <label className="input-group-text" for="inputGroupSelect01">Department:</label>
  </div>
  <select className="custom-select" id="inputGroupSelect01" required  name="department"
  onChange={(this.regUserChangeHandler)}>
    <option defaultValue>Choose...</option>
    <option value="Footwear">Footwear</option>
    <option value="Bikes">Bikes</option>
    <option value="Sportswear">Sportswear</option>
    <option value="Ice_hockey_equipment">Ice_hockey_equipment</option>
    <option value="Outdoor">Outdoor</option>
    <option value="Supplements">Supplements</option>
    <option value="Racket_sports">Racket_sports</option>
  </select>
</div>
 
  
  <button  className="btn btn-success btn-lg">Sign Up</button>
      </form>
    </div>
      )
  }
  }
  
  export default Registration;