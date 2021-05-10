import React, { Component } from 'react';


  
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
     }
   
      regUserChangeHandler =(event) => {
        this.setAllUsers({ [event.target.name]: event.target.value });
    
      }
    
    render() {
      return(
        <div>
        <div className=" col-xs-0 col-md-4 "></div>
      <form className="needs-validation" className=" col-xs-1 col-md-4  shadow p-3 mb-5 bg-white rounded" novalidate id="reg-form" onSubmit={this.submitHandler}>
      <h1 className="text-dark">Registration Form: </h1>
      <div className="form-group ">
    <label for="exampleInputUsername">Username:</label>
      <input type="text" className="form-control" id="exampleInputUserName" placeholder="Username" required name="username"
        onChange={(this.regUserChangeHandler)}></input>
            <div className="invalid-feedback">
                Please provide a valid city.
              </div>
              <div className="valid-feedback">Looks good!</div>
  </div>
      <div className="form-group "  >
    <label for="exampleInputEmail1">Email address:</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required name="email"
    onChange={(this.regUserChangeHandler)}></input>   
  </div>
 
  <div className="form-group ">
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
  <div className="form-group ">
    <label for="number">Phone Number:</label>
    <input type="text" className="form-control" id="exampleInputPassword2" placeholder="0003332244" required name="phone"
    onChange={(this.regUserChangeHandler)}></input>
  </div>
  <label for="number">Which store do you work at?</label>
  <div className="input-group mb-3 ">
  <div className="input-group-prepend">
    <label className="input-group-text" for="inputGroupSelect01">Stores</label>
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

 
  
  <button  className="btn btn-success btn-lg">Sign Up</button>
  <button  className="btn btn-warning btn-lg ml-3">Sign In</button>
      </form>
    </div>
      )
  }
  }
  
  export default Registration;