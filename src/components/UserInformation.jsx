import React, { Component } from 'react';
import './UserInformation.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function getUsers(username) {
   
    console.log("hola");
  
     // var fetchingFrom = `http://tollo.duckdns.org:61338/getUsersAdmin/${1}/${department}`
     //var fetchingFrom = `http://localhost:61339/getUsers?store=${1}&username=${username}`
      var token = (cookies.get('jwt')).key;
      var fetchingFrom = `http://tollo.duckdns.org:61338/getUsers?store=${1}&username=${username}&token=${token}`
      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
      const finalSet = setOfData.data[0];
      return finalSet;
  
  }
  async function updatePassword(username,password) {
   
    console.log("hola");
  
     // var fetchingFrom = `http://tollo.duckdns.org:61338/getUsersAdmin/${1}/${department}`
  //   var fetchingFrom = `http://localhost:61339/updateUserPassword?username=${username}&password=${password}`
  var token = (cookies.get('jwt')).key;
  var fetchingFrom = `http://tollo.duckdns.org:61338/updateUserPassword?username=${username}&password=${password}&token=${token}`
   // var fetchingFrom = `http://tollo.duckdns.org:61338/getUsers?store=${1}&username=${username}`
      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
      const finalSet = setOfData.data[0];
      return finalSet;
  
  }
  async function updateEmail(username,email) {
   
    console.log("hola");
    var token = (cookies.get('jwt')).key;
     // var fetchingFrom = `http://tollo.duckdns.org:61338/getUsersAdmin/${1}/${department}`
    // var fetchingFrom = `http://localhost:61339/updateUserEmail?username=${username}&email=${email}`
     var fetchingFrom = `http://tollo.duckdns.org:61338/updateUserEmail?username=${username}&email=${email}&token=${token}`
   // var fetchingFrom = `http://tollo.duckdns.org:61338/getUsers?store=${1}&username=${username}`
      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
      const finalSet = setOfData.data[0];
      return finalSet;
  
  }
  async function updatePhone(username,phone) {
   
    console.log("hola");
    var token = (cookies.get('jwt')).key;
     // var fetchingFrom = `http://tollo.duckdns.org:61338/getUsersAdmin/${1}/${department}`
    // var fetchingFrom = `http://localhost:61339/updateUserPhone?username=${username}&phone=${phone}`
     var fetchingFrom = `http://tollo.duckdns.org:61338/updateUserPhone?username=${username}&phone=${phone}&token=${token}`
   // var fetchingFrom = `http://tollo.duckdns.org:61338/getUsers?store=${1}&username=${username}`
      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
      const finalSet = setOfData.data[0];
      return finalSet;
  
  }
  
  
  
class  userInformation extends Component {
    Constructor(){
      this.regUserChangeHandler=this.regUserChangeHandler.bind(this);
    }
    state={
        hasMounted:false,
        user:{


        },
        username: '',
        phone: null,
        first_name: '',
        last_name: '',
        email: null,
        department:1,
        oldPassword:null,
        newPassword:null,
        confirmPassword:false,
     }
     callGetUsers=async()=>{
        console.log("här");
        const finalSet=await getUsers("b");
        console.log(finalSet);
        this.setState({user:finalSet});
      }
      componentDidMount= async() =>{
        if(!this.state.hasMounted){
          this.callGetUsers();
          this.setState({hasMounted:true});
    
        }
        
      }
     
   
      regUserChangeHandler =(event) => {
        this.setState({ [event.target.name]: event.target.value });
    
      }
      ChangeHandler =(event) => {
          this.setState({ [event.target.name]: event.target.value });
       
    
      }
      passwordCheckHandler=(event)=>{
        this.setState({ [event.target.name]: !this.state.confirmPassword});
      }
  
      changePhone =async () =>{

        console.log(this.state.phone);
        if(this.state.phone!==null ){
          await updatePhone(this.state.user.username,this.state.phone);

        }else{
            console.log("gick in hit");
        }

       // event.target.reset();
    
      }
      changeEmail=async () =>{
   
        console.log(this.state.email);
        if(this.state.email!==null){
          await updateEmail(this.state.user.username,this.state.email);

        }else{
            console.log("gick in hit");
        }

       // event.target.reset();
    
      }
      changePassword=async () =>{
        console.log(this.state.newPassword);
        console.log(this.state.confirmPassword);
        if(this.state.newPassword!==null && this.state.confirmPassword!==false){

          await updatePassword(this.state.user.username,this.state.newPassword);
        }else{
         
        }
     

       // event.target.reset();
    
      }
    render() {
      return(
        <div>
            <h1>Profile Information:</h1>
        <h3>Username:{this.state.user.username}</h3>
        <br></br>
        <h3>Name:{this.state.user.first_name} {this.state.user.last_name}</h3>

        <div className="test" >
          <h3>Phone Number:{this.state.user.phone}</h3>
          <div className="input-group ">
  <input type="text" class="form-control" placeholder="Change Phone Number" aria-label="Recipient's username" aria-describedby="basic-addon2"required
   name="phone" onChange={(this.ChangeHandler)}></input>
  <div className="input-group-append">
    <button className="text-light btn  btn-default  changeButton" type="button" onClick={this.changePhone.bind(this)}>Change</button>
  </div>
</div>

        <div className="test">
          <h3>Email:{this.state.user.email}</h3>
          <div className="input-group ">
  <input type="text" class="form-control" placeholder="Change Email" aria-label="Recipient's username" aria-describedby="basic-addon2" required
   name="email"onChange={(this.ChangeHandler)}></input>
  <div className="input-group-append">
    <button className="text-light btn  btn-default  changeButton" type="button" onClick={this.changeEmail.bind(this)}>Change</button>
  </div>
</div>
      
        </div>

        <div className="test">
          <h3 >Password:</h3>
          <div className="input-group ">

  <div className="mt-1 input-group ">
  <input type="password" class="form-control" placeholder="New Password" aria-label="Recipient's username" aria-describedby="basic-addon2" required
  name="newPassword"  onChange={(this.ChangeHandler)}></input>
  <div className="input-group-append">
    <button className="text-light btn  btn-default  changeButton" type="button" onClick={this.changePassword.bind(this)}>Change</button>
  </div>
  </div>
  <div className="offset-7  form-check lm">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="confirmPassword" onClick={(this.passwordCheckHandler.bind(this))}></input>
  <label class="form-check-label" for="flexCheckDefault">
        Confirm Password
  </label>
</div>
  
</div>
        
        </div>
        </div>

    </div>
      )
  }
  }
  
  export default userInformation;