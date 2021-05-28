import React, { Component } from 'react';
import './Registration.css';
import Cookies from 'universal-cookie'

const cookies = new Cookies();
  
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
        department:'',
        regFlag:true
   
     }
    
      regUserChangeHandler =(event) => {
        this.setState({ [event.target.name]: event.target.value });
    
      }
   
      addUser = _=>{
        console.log("wtf");
        var token = (cookies.get('jwt')).key;
        //const {user}=this.state.user;
        console.log(this.state.department);
        //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
        var depId=0;
        if(this.state.department=="Footwear"){
          depId=1;

        }else if(this.state.department=="Bikes"){
          depId=2;
          
        }else if(this.state.department=="Sportswear"){
          depId=3;
          
        }
        else if(this.state.department=="Ice_hockey_equipment"){
          depId=4;
          
        }else if(this.state.department=="Outdoor"){
          depId=5;
          
        }else if(this.state.department=="Supplements"){
          depId=6;
          
        }else{
          depId=7;
        }
        
      fetch(`http://tollo.duckdns.org:61338/add?username=${this.state.username}&password=${this.state.password}&first_name=${this.state.first_name}&last_name=${this.state.last_name}&store=${this.state.store}&admin=${this.state.admin}&phone=${this.state.phone}&email=${this.state.email}&department=${this.state.department}&depId=${depId}&token=${token}`)
     //  fetch(`http://192.168.0.111:61339/add?username=${this.state.username}&password=${this.state.password}&first_name=${this.state.first_name}&last_name=${this.state.last_name}&store=${this.state.store}&admin=${this.state.admin}&phone=${this.state.phone}&email=${this.state.email}&department=${this.state.department}&depId=${depId}&token=${token}`)  
        .then(response => response.json())
        .then(data => this.setState({regFlag:data}))
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
        
      <form className="needs-validation"  className="" id="test1"novalidate id="reg-form" onSubmit={this.submitHandler}>
      <h1 className="text-dark" >Registration Form: </h1>
      <div className="form-group " className="test1">
    <label htmlFor="exampleInputUsername">Username:</label>
      <input type="text" className="form-control" id="exampleInputUserName" placeholder="Username" required name="username"
        onChange={(this.regUserChangeHandler)}></input>
            <div className="invalid-feedback">
                Please provide a valid city.
              </div>
              <div className="valid-feedback">Looks good!</div>
  </div>
      <div className="form-group " className="test1" >
    <label htmlFor="exampleInputEmail1">Email address:</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required name="email"
    onChange={(this.regUserChangeHandler)}></input>   
  </div>
 
  <div className="form-group "className="test1">
    <label htmlFor="exampleInputPassword1">Password:</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required name="password"
    onChange={(this.regUserChangeHandler)}></input>

  </div>
  <label htmlFor="number">Name:</label>
  <div className="input-group ">
  
  <input type="text" className="form-control" placeholder="First Name" required  name="first_name"
  onChange={(this.regUserChangeHandler)}></input>
  <input type="text" className="form-control" placeholder="Last Name" required  name="last_name"
  onChange={(this.regUserChangeHandler)}></input>
</div>
  <div className="form-group "className="test1">
    <label htmlFor="number">Phone Number:</label>
    <input type="text" className="form-control" id="exampleInputPassword2" placeholder="0003332244" required name="phone"
    onChange={(this.regUserChangeHandler)}></input>
  </div>
  <label htmlFor="number">Which store do you work at?</label>
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
    <option value="Ice_hockey_equipment">Ice hockey equipment</option>
    <option value="Outdoor">Outdoor</option>
    <option value="Supplements">Supplements</option>
    <option value="Racket_sports">Racket_sports</option>
  </select>
</div>
{this.state.regFlag === false && <p>Couldn't register user, please try again with different username.</p>}
 
  
  <button  className="btn btn-success btn-lg">Sign Up</button>
      </form>
    </div>
      )
  }
  }
  
  export default Registration;