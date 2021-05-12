import React, { Component } from 'react';
import './UserInformation.css';
async function getUsers(username) {
   
    console.log("hola");
  
     // var fetchingFrom = `http://tollo.duckdns.org:61338/getUsersAdmin/${1}/${department}`
    // var fetchingFrom = `http://localhost:61339/getUsers?store=${1}&username=${username}`
    var fetchingFrom = `http://tollo.duckdns.org:61338/getUsers?store=${1}&username=${username}`
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
        phone: '',
        first_name: '',
        last_name: '',
        phone: '',
        department:1,
        oldPassword:'',
        newPassword:'',
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
   
      submitHandler =(event) =>{
        event.preventDefault();
        console.log(this.state);
        event.target.className += " was-validated";

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
          <p className="ml-3">Change </p>
        

        <div className="test">
          <h3>Email:{this.state.user.email}</h3>
          <p className="ml-3">Change </p>
        </div>

        <div className="test">
          <h3>Password:</h3>
          <p className="ml-3">Change </p>
        </div>
        </div>

    </div>
      )
  }
  }
  
  export default userInformation;