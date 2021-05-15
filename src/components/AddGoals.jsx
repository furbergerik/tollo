import React, { Component } from 'react';
//import './Registration.css';
import Cookies from 'universal-cookie'


const cookies = new Cookies();
async function getUsers(store,department,admin) {
    console.log("hola");
    console.log(department);
    var token = (cookies.get('jwt')).key;
    if(admin===1){
  
  //  var fetchingFrom = `http://192.168.0.111:61339/getUsersAdmin?store=${store}&department=${department}&token=${token}`
    var fetchingFrom = `http://tollo.duckdns.org:61338/getUsersAdmin?store=${store}&department=${department}&token=${token}`
      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
      const finalSet = setOfData.data;
      return finalSet;
    }else{
        return "no";
    }
}
async function getUser(store) {
   
    console.log("hola");
  

      var token = (cookies.get('jwt')).key;
      var username = (cookies.get('username')).key;
      //var fetchingFrom = `http://tollo.duckdns.org:61338/getUsers?store=${1}&username=${username}&token=${token}`
      //var fetchingFrom = `http://192.168.0.111:61339/getUsers?store=${1}&username=${username}&token=${token}`
      var fetchingFrom = `http://tollo.duckdns.org:61338/getUsers?store=${store}&username=${username}&token=${token}`
      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
      const finalSet = setOfData.data[0];
      return finalSet;

  }

class  AddGoals extends Component {
    Constructor(){
      this.regUserChangeHandler=this.regUserChangeHandler.bind(this);
    }
    state={
        user:[],
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        store: '',
        admin:0,
        department:'',
        hasMounted:false,
        tab:"",
     }
     callGetUsers=async()=>{
        console.log("här");
       
        const finalSet=await getUsers(this.state.user.store,this.state.user.department,this.state.user.admin);
        console.log(finalSet);
        this.setState({user:finalSet});
      }
     componentDidMount(){
         if(!this.state.hasMounted){
            this.callGetUsers.bind(this);
            this.setState({hasMounted:true});

        }
     }
   
    render() {
         
    let message
    if (this.state.tab == "users"){
      message = 
      <div>
  <form className="needs-validation"  className="shadow p-3 mb-5 rounded" id="test1"novalidate id="reg-form" onSubmit={this.submitHandler}>
      <h1 className="text-dark" >Registration Form: </h1>
    
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
    <option value="Ice_hockey_equipment">Ice hockey equipment</option>
    <option value="Outdoor">Outdoor</option>
    <option value="Supplements">Supplements</option>
    <option value="Racket_sports">Racket_sports</option>
  </select>
</div>
 
  
  <button  className="btn btn-success btn-lg">Sign Up</button>
      </form>

      </div>
    }else if(this.state.tab == "user"){
        <div>
  <form className="needs-validation"  className="shadow p-3 mb-5 rounded" id="test1"novalidate id="reg-form" onSubmit={this.submitHandler}>
      <h1 className="text-dark" >Registration Form: </h1>
    
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
    <option value="Ice_hockey_equipment">Ice hockey equipment</option>
    <option value="Outdoor">Outdoor</option>
    <option value="Supplements">Supplements</option>
    <option value="Racket_sports">Racket_sports</option>
  </select>
</div>
 
  
  <button  className="btn btn-success btn-lg">Sign Up</button>
      </form>

        </div>


    }else{

        message=
        <div>
            <h3>Insert goal for one employee:</h3>
            
            <h3>Insert goal for all  employees:</h3>
        </div>
    }
      return(
        <div>

        {message}
    </div>
      )
  }
  }
  
  export default AddGoals;