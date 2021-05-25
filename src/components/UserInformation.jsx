import React, { Component } from 'react';
import './UserInformation.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function getUsers(username) {
   
    console.log("hola");
  

      var token = (cookies.get('jwt')).key;
      var fetchingFrom = `http://tollo.duckdns.org:61338/getUsers?username=${username}&token=${token}`
     // var fetchingFrom = `http://192.168.0.111:61339/getUsers?username=${username}&token=${token}`
      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
      const finalSet = setOfData.data[0];
      return finalSet;

  }
  async function updatePassword(username,password) {
   
    console.log("hola");
  

  var token = (cookies.get('jwt')).key;
  var fetchingFrom = `http://tollo.duckdns.org:61338/updateUserPassword?username=${username}&password=${password}&token=${token}`
 // var fetchingFrom = `http://192.168.0.111:61339/updateUserPassword?username=${username}&password=${password}&token=${token}`

      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
      const finalSet = setOfData.data[0];
      console.log(finalSet);
      return finalSet;
  
  }
  async function updateEmail(username,email) {
   
    console.log("hola");
    var token = (cookies.get('jwt')).key;

     var fetchingFrom = `http://tollo.duckdns.org:61338/updateUserEmail?username=${username}&email=${email}&token=${token}`
    // var fetchingFrom = `http://192.168.0.111:61339/updateUserEmail?username=${username}&email=${email}&token=${token}`

      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
      const finalSet = setOfData.data[0];
      console.log(finalSet);
      return finalSet;
  
  }
  async function updatePhone(username,phone) {
   
    console.log("hola");
    var token = (cookies.get('jwt')).key;

   // var fetchingFrom = `http://tollo.duckdns.org:61338/updateUserPhone?username=${username}&phone=${phone}&token=${token}`
   var fetchingFrom = `http://192.168.0.111:61339/updateUserPhone?username=${"b"}&phone=${phone}&token=${token}`

      const fetchedData = await fetch(fetchingFrom);
      var response = await fetchedData.json();
      console.log("finalSet");
      console.log(response[0]);
      
      return response;
  
  }
  async function updatePic(username,filename) {
   
    console.log("hola");
    console.log(username);
    console.log(filename);
        var token = (cookies.get('jwt')).key;


  // var fetchingFrom = `http://192.168.0.111:61339/addProfilePic?filename=${filename}&username=${username}&token=${token}`
   var fetchingFrom = `http://tollo.duckdns.org:61338/addProfilePic?filename=${filename}&username=${username}&token=${token}`

      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
    
  
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
        newUrl:null,
        flagPhone:1,
        flagEmail:1,
        flagPassword:1,

     }
     callGetUsers=async()=>{
        console.log("här");
        const finalSet=await getUsers(cookies.get('username').key);
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
        var x=false;
        console.log(this.state.phone);
        if(this.state.phone!==null ){
          x= await updatePhone(this.state.user.username,this.state.phone);

        }else{
            console.log("gick in hit");
        }
        
          if(!x){
            this.setState({flagPhone:2})
          }else{
            this.setState({flagPhone:1})
            this.setState({user:''});
            this.callGetUsers();
       
    
          }

     
        this.setState({user:''});
        this.callGetUsers();
       // event.target.reset();
    
      }
      changePic=async() =>{
        console.log("vi kom hit");
        if(this.state.newUrl !=null){
          console.log("inne");
          await updatePic(this.state.user.username,this.state.newUrl);
          await this.callGetUsers();
          this.setState({user:''});
        this.callGetUsers();

        }

      }
      changeEmail=async () =>{
        var x=false;
        console.log(this.state.email);
        if(this.state.email!==null){
         x= await updateEmail(this.state.user.username,this.state.email);

        }else{
            console.log("gick in hit");
        }
        if(!x){
          this.setState({flagEmail:2})
        }else{
          this.setState({flagEmail:1})
          this.setState({user:''});
          this.callGetUsers();
     
  
        }
    
       // event.target.reset();
    
      }
      changePassword=async () =>{
        var x=false;
        console.log(this.state.newPassword);
        console.log(this.state.confirmPassword);
        if(this.state.newPassword!==null && this.state.confirmPassword!==false){

          x= await updatePassword(this.state.user.username,this.state.newPassword);
        }else{
         
        }
        if(!x){
          this.setState({flagPassword:2})

        }else{

          this.setState({flagPassword:1})
        }
        this.setState({user:''});
        this.callGetUsers();
     

       // event.target.reset();
    
      }
    
    render() {
      return(
        
        <div className="container">



<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Chage Img</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Paste Image url:
        <input type="text" name="newUrl" onChange={this.ChangeHandler}></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success" onClick={this.changePic.bind(this) }data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
          
            <div class="col-md-4" className="profile-pic" style={{backgroundImage:`url(${this.state.user.profilePath})`} }>
            <span className="spanFix" id="cameraIcon"></span>
            <span className="spanFix fas fa-camera" data-toggle="modal" data-target="#exampleModal" >Change Image</span>
          </div>
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
  { this.state.flagPhone === 2 && <p1>Your username or password is wrong, please try again.</p1>}
</div>

        <div className="test">
          <h3>Email:{this.state.user.email}</h3>
          <div className="input-group ">
  <input type="text" class="form-control" placeholder="Change Email" aria-label="Recipient's username" aria-describedby="basic-addon2" required
   name="email"onChange={(this.ChangeHandler)}></input>
  <div className="input-group-append">
    <button className="text-light btn  btn-default  changeButton" type="button" onClick={this.changeEmail.bind(this)}>Change</button>
  </div>
  { this.state.flagEmail === 2 && <p1>Your username or password is wrong, please try again.</p1>}
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
{ this.state.flagPassword === 2 && <p1>Your username or password is wrong, please try again.</p1>}
  
</div>
        
        </div>
        </div>

    </div>
      )
  }
  }
  
  export default userInformation;