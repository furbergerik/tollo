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
async function getUsers(department,store) {
  console.log("hola");
  console.log(department);
  var token = (cookies.get('jwt')).key;

  var fetchingFrom = `http://tollo.duckdns.org:61338/getUsersAdmin?store=${store}&department=${department}&allUsers=1&token=${token}`

  //var fetchingFrom = `http://192.168.0.111:61339/getUsersAdmin?store=${1}&department=${department}&token=${token}`
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;

}
async function getStoreData(dataCategory, ID, storeNr){
  if (ID == 0) {
    var token = (cookies.get('jwt')).key;
    var fetchingFrom = 'http://tollo.duckdns.org:61338/store' + storeNr + 'v2/' + dataCategory + '?token=' + token
    //var fetchingFrom = 'http://192.168.0.111:61339/store' + storeNr + 'v2/' + dataCategory + '?token=' + token
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }

  else {
    var token = (cookies.get('jwt')).key;
    var fetchingFrom = 'http://tollo.duckdns.org:61338/store' + storeNr + 'v2/' + dataCategory + '/' + ID + '?token=' + token
    //var fetchingFrom = 'http://192.168.0.111:61339/store' + storeNr + 'v2/' + dataCategory + '/' + ID + '?token=' + token
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }
}
async function getDepartmentProducts(departmentId) {
  var token = (cookies.get('jwt')).key;

  var fetchingFrom = `http://tollo.duckdns.org:61338/store1v2/department?department=${departmentId}&token=${token}`
  //var fetchingFrom = `http://192.168.0.111:61339/store1v2/department?department=${departmentId}&token=${token}`

  const response = await fetch(fetchingFrom);

  const setOfData = await response.json();
  const finalSet = setOfData.data;

  return finalSet;
}

async function getMonthlyBestProductData(year, month, dataCategory, dataType, storeNr, depNames){
  var listMonth = [];
  var listMonthProd = []
  for (var i = 1; i < 8; i++) {
  var mostSold = 0;
  var prodNames = "";
  var productIdList = await getDepartmentProducts(i)
  for (var j in productIdList) {
  var salesData = await getStoreData(dataCategory, 'p'+productIdList[j], storeNr);
  var monthData = salesData['y'+year]['m'+month];
  var listDay = 0;
    for (var k in monthData) {
      listDay+=monthData[k][dataType];
    }
    if (listDay > mostSold){
      mostSold = listDay
      prodNames=monthData[0]["Title"]
      }
    }
    listMonth.push(listDay);
    listMonthProd.push([depNames[i-1], prodNames]);  
  }
    bubbleSort(listMonth, listMonthProd);
    return [listMonth, listMonthProd]
}

async function getMonthlyDepartmentData(year, month, dataCategory, dataType, storeNr){
  var listMonth = [];
  var listMonthDep = []
  var listDep = []
  for (var i = 1; i < 8; i++) {
  var salesData = await getStoreData(dataCategory, 'd'+i, storeNr);
  var monthData = salesData['y'+year]['m'+month];
  var listDay = 0;
    for (var j in monthData) {
      listDay+=monthData[j][dataType];
    }
      var depName=monthData[0]["Dep Title"]
      listMonth.push(listDay)
      listMonthDep.push(depName)
      listDep.push(depName)
    }
    bubbleSort(listMonth, listMonthDep)
    return [listMonth, listMonthDep, listDep]
}

function bubbleSort(inputArr, inputLabel) {
  var len = inputArr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (inputArr[j] < inputArr[j + 1]) {
        let tmp = inputArr[j];
        let tmpLabel = inputLabel[j]
        inputArr[j] = inputArr[j + 1];
        inputLabel[j] = inputLabel[j + 1]
        inputLabel[j + 1] = tmpLabel;
        inputArr[j + 1] = tmp;
      }
    }
  }
  return [inputArr, inputLabel];
};


class MyAdmin extends Component {
  constructor(props) {
    super(props);
  }
  
  
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
    department:'Footwear',
    store:1
    }
  props={
    olle:null

    
  }
  componentDidMount= async() =>{
    if(!this.state.hasMounted){
      this.callGetUsers(this.state.department,this.state.store);
      this.setState({hasMounted:true});
      const [a,b,c]= await getMonthlyDepartmentData(2020, 12, "depSales", "Sales", 1)
        console.log(await getMonthlyBestProductData(2020, 12, "prodSales", "Sales", 1, c))

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

  callGetUsers=async(department,store)=>{
    console.log("här");
    const finalSet=await getUsers(department,store);
    console.log(finalSet);
    this.setState({users:finalSet});
    this.setState({state:finalSet[10]})
  }

  addUser = _=>{
    console.log("wtf");
    //const {user}=this.state.user;
    console.log(this.state.user.username);
    //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
    var token = (cookies.get('jwt')).key;
    
    //fetch(`http://192.168.0.111:61339/add?username=${this.state.user.username}&password=${this.state.user.password}&first_name=${this.state.user.first_name}&last_name=${this.state.user.last_name}&store=${this.state.user.store}&admin=${this.state.user.admin}&phone=${this.state.user.phone}&email=${this.state.user.email}&token=${token}`)
    fetch(`http://tollo.duckdns.org:61338/add?username=${this.state.user.username}&password=${this.state.user.password}&first_name=${this.state.user.first_name}&last_name=${this.state.user.last_name}&store=${this.state.user.store}&admin=${this.state.user.admin}&phone=${this.state.user.phone}&email=${this.state.user.email}&token=${token}`)
    .then(response => response.json())
    .then(data => console.log(data))
   // .then(this.getUser)
    .catch(err => console.error(err))
  }


  cancelCourse = () => { 
    document.getElementById("reg-form").reset();
  }
  handleClick=async() =>{
    await this.callGetUsers(this.state.department,this.state.store);

    
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
          
    
        <div className="profileInfo shadow p-3 mb-5 rounded col-md-2 offset-md-2 " >
        {<UserInformation></UserInformation>}
        </div>

<div>

</div>
<div className=" col-md-3">
        {<Registration></Registration>}
   
        </div>
        <div   className="employee  col-md-3 overflow-auto shadow mb-5  p-3 rounded">
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
    
    <div className="btn-group btn-group-toggle mt-2 col-md-6" data-toggle="buttons">
          <label className="btn btn-secondary active btn-lg">
            <input type="radio" name="options" id="option1" autoComplete="off" onClick={this.selectedButton.bind(this, "Store")}></input> My store
          </label>
          <label className="btn btn-secondary active btn-lg">
            <input type="radio" name="options" id="option1" autoComplete="off" onClick={this.selectedButton.bind(this, "Department")}></input>Add Employee Goals
          </label>
          
          <label className="btn btn-secondary btn-lg ">
            <input type="radio" name="options" id="option3" autoComplete="off" onClick={this.selectedButton.bind(this, "Settings")}></input>
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

