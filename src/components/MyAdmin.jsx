import { Component } from 'react';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import './MyAdmin.css';
import Cookies from 'universal-cookie';
import Registration from './Registration.jsx';
import UserInformation from './UserInformation';
import AddGoals from './AddGoals';

const cookies = new Cookies();

//http://tollo.duckdns.org
//192.168.0.111
async function getUsers(department) {
  console.log("hola");
  console.log(department);
  var token = (cookies.get('jwt')).key;

  //var fetchingFrom = `http://tollo.duckdns.org:61338/getUsersAdmin?store=${1}&department=${department}&token=${token}`
  var fetchingFrom = `http://192.168.0.111:61339/getUsersAdmin?store=${1}&department=${department}&token=${token}`
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;

}

class MyAdmin extends Component {
  
  
  
  state ={
    hasMounted:false,
    users:[],
    oldPassword:"",
    newPassword:"",
    oldNumber:"",
    newNumber:"",
    oldEmail:"",
    newEmail:"",
    colorOptions: ['#F94144', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590'],
    tab: "Store",
    department:'Footwear'
    }
  props={
    olle:null

    
  }
  componentDidMount= async() =>{
    if(!this.state.hasMounted){
      this.callGetUsers(this.state.department);
      this.setState({hasMounted:true});

    }
    
  }
 
  
  selectedButton = (buttonClicked) => {
    console.log(this.state.tab);
    this.setState({tab: buttonClicked});
  }

  passwordChangeHandler =(event) => {
    this.setState({ [event.target.name]: event.target.value });

  }
  usernameChangeHandler =(event) => {
    this.setState({user:{...this.state.user,username:event.target.value}});

  }

  first_nameChangeHandler =(event) => {
    this.setState({user:{...this.state.user,first_name:event.target.value}});

  }
  last_nameChangeHandler =(event) => {
    this.setState({user:{...this.state.user,last_name:event.target.value}});

  }
  storeChangeHandler =(event) => {
    this.setState({user:{...this.state.user,store:event.target.value}});

  }
  phoneChangeHandler =(event) => {
    this.setState({user:{...this.state.user,phone:event.target.value}});

  }
  submitHandler =(event) =>{
    event.preventDefault();
    console.log(this.state.user);
    event.target.className += " was-validated";
    this.addUser();
   // event.target.reset();

  }
  departmentChangeHandler=async (event) => {
    this.setState({ [event.target.name]: event.target.value });


    console.log("hej");

    

  }

  callGetUsers=async(department)=>{
    console.log("här");
    const finalSet=await getUsers(department);
    console.log(finalSet);
    this.setState({users:finalSet});
  }

  addUser = _=>{
    console.log("wtf");
    //const {user}=this.state.user;
    console.log(this.state.user.username);
    //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
    var token = (cookies.get('jwt')).key;
    fetch(`http://192.168.0.111:61339/add?username=${this.state.user.username}&password=${this.state.user.password}&first_name=${this.state.user.first_name}&last_name=${this.state.user.last_name}&store=${this.state.user.store}&admin=${this.state.user.admin}&phone=${this.state.user.phone}&email=${this.state.user.email}&token=${token}`)
   // fetch(`http://tollo.duckdns.org:61338/add?username=${this.state.user.username}&password=${this.state.user.password}&first_name=${this.state.user.first_name}&last_name=${this.state.user.last_name}&store=${this.state.user.store}&admin=${this.state.user.admin}&phone=${this.state.user.phone}&email=${this.state.user.email}&token=${token}`)
    .then(response => response.json())
    .then(data => console.log(data))
   // .then(this.getUser)
    .catch(err => console.error(err))
  }


  cancelCourse = () => { 
    document.getElementById("reg-form").reset();
  }
  handleClick=async() =>{
    await this.callGetUsers(this.state.department);

    
  }
  
  
  //renderUser=({user_id,username}) => <div key={user_id}>{username}</div>
  render() {
  
    //const{users}=this.state.users;
   
    //const listItems = listUser.map((number) =><li>{number}</li>
   // );

   console.log("hej");
 
 
    let message
    if (this.state.tab == "Store"){
      message = 
      <div>            
        <h1>My store and sales info:</h1>
        <div className="profile-pic"  >
          <span id="spanFix cameraIcon"></span>
          <span className="spanFix fas fa-camera" >Change Image</span>
        </div>

        <h3>My stores statistics</h3>
        <h3>My personal info </h3>
      </div>
    }

    else if(this.state.tab == "Department"){
      message = <div>
        <AddGoals></AddGoals>

      </div>
    }

    else if(this.state.tab == "Settings"){
      message = 
      <div className="mt-2 row ">
          
        <div className="col-md-3 offset-1 ">
        <div className="profileInfo shadow p-3 mb-5 rounded" >
        {<UserInformation></UserInformation>}
        </div>
   
</div>
<div>

</div>
<div className="offset-1">
        {<Registration></Registration>}
   
        </div>
        <div   className="employee offset-1 overflow-auto shadow p-3 mb-5 rounded">
          <h1>Store employees:</h1> 
          <div className="input-group mb-3 ">
  <div className="input-group-prepend">
    <label className="input-group-text" for="inputGroupSelect01">Department:</label>
  </div>
  <select className="custom-select" id="inputGroupSelect01" required  name="department"
  onChange={(this.departmentChangeHandler.bind(this))}>

    <option defaultValue value="Footwear">Footwear</option>
    <option value="Bikes">Bikes</option>
    <option value="Sportswear">Sportswear</option>
    <option value="Ice_hockey_equipment">Ice_hockey_equipment</option>
    <option value="Outdoor">Outdoor</option>
    <option value="Supplements">Supplements</option>
    <option value="Racket_sports">Racket_sports</option>
  </select>
  <div className="input-group-append">
    <button className="text-light btn  btn-default  changeButton" type="button" onClick={this.handleClick.bind(this)}>Change</button>
  </div>
</div>

          {this.state.users.map((person,index)=>(
            <div >
            <p className="info">Name:</p>
            <p style={{display:"inline-block"}}>{person.username} {person.last_name}</p>
            <p className="info"> Works in Department:</p>
            <p style={{display:"inline-block"}}>{person.department} </p>
            <br></br>
            <p className="info" > Contact:</p>
            <p style={{display:"inline-block"}}>{person.phone}</p>
            </div>
          )) }
       

    
        </div>

  </div>
    }
  
    return (
    
    <div className="App">
    
    <div class="btn-group btn-group-toggle mt-2 col-md-6" data-toggle="buttons">
          <label class="btn btn-secondary active btn-lg">
            <input type="radio" name="options" id="option1" autocomplete="off" onClick={this.selectedButton.bind(this, "Store")}></input> My store
          </label>
          <label class="btn btn-secondary active btn-lg">
            <input type="radio" name="options" id="option1" autocomplete="off" onClick={this.selectedButton.bind(this, "Department")}></input>Add Employee Goals
          </label>
          
          <label class="btn btn-secondary btn-lg ">
            <input type="radio" name="options" id="option3" autocomplete="off" onClick={this.selectedButton.bind(this, "Settings")}></input>
            Settings and Registration
          </label>
        </div>
<div className="offset-md-4">

</div>
<div className="row">

<div className="mt-1 col-md-12" id="rightBar">
  {message}
</div>

</div>

    </div>
  );
      

  
  }
}

export default MyAdmin;

