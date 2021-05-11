import { Component } from 'react';
import './MyProfile.css';
import Cookies from 'universal-cookie';
//http://tollo.duckdns.org
//192.168.0.111

async function getStoreData(dataCategory, ID, storeNr){
  if (ID == 0) {
    var fetchingFrom = 'http://tollo.duckdns.org:61338/store' + storeNr + 'v2/' + dataCategory
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }

  else {
    var fetchingFrom = 'http://tollo.duckdns.org:61338/store' + storeNr + 'v2/' + dataCategory + '/' + ID
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }
}

class MyProfile extends Component {
  state = {
    users: [],
    oldPassword: "",
    newPassword: "",
    oldNumber: "",
    newNumber: "",
    oldEmail: "",
    newEmail: "",
    colorOptions: ['#F94144', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590'],
    tab: "Store",
    totSales: "",
    totProfit: "",
    margin: ""
    
  }
  props = {
    olle: null

  }

  getUserInfo = async() => {
    const response = await fetch('http://tollo.duckdns.org:61338/getUsers?store=null&username=b');
    console.log(response);
    const setOfData = await response.json();
    console.log(setOfData);
    const finalSet = setOfData.data;
    return finalSet;
  }

  getMonthlyData = async(year, month, dataCategory, dataType, ID, storeNr) => {
    console.log("kommer vi hit?")
    const salesData = await getStoreData(dataCategory, ID, storeNr);
    console.log(salesData);
    var monthData = salesData[year][month];
    var listDay = 0;
    if (dataType == "Profit %"){
      for (var i in monthData) {
        listDay+=(monthData[i][dataType]);
      }
      return (listDay/monthData.length).toFixed(2);
    }
    else{
      for (var i in monthData){
        listDay+=(monthData[i][dataType]);
      }
      return listDay;
    }
  }
  

  selectedButton = (buttonClicked) => {
    this.setState({tab: buttonClicked});
  }

  passwordChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  usernameChangeHandler = (event) => {
    this.setState({ user: { ...this.state.user, username: event.target.value } });
  }

  first_nameChangeHandler = (event) => {
    this.setState({ user: { ...this.state.user, first_name: event.target.value } });

  }
  last_nameChangeHandler = (event) => {
    this.setState({ user: { ...this.state.user, last_name: event.target.value } });

  }
  storeChangeHandler = (event) => {
    this.setState({ user: { ...this.state.user, store: event.target.value } });

  }
  phoneChangeHandler = (event) => {
    this.setState({ user: { ...this.state.user, phone: event.target.value } });

  }
  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.user);
    event.target.className += " was-validated";
    this.addUser();
    // event.target.reset();

  }

  async componentDidMount() {
    this.setState({totSales: await this.getMonthlyData("y2020", "m12", "totSales", "Total sales", 0, 1)});
    this.setState({totProfit: await this.getMonthlyData("y2020", "m12", "totSales", "Profit exl. tax", 0, 1)});
    this.setState({margin: await this.getMonthlyData("y2020", "m12", "totSales", "Profit %", 0, 1)});
  }

  addUser = _ => {
    console.log("wtf");
    //const {user}=this.state.user;
    console.log(this.state.user.username);
    //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
    fetch(`http://tollo.duckdns.org:61338/add?username=${this.state.user.username}&password=${this.state.user.password}&first_name=${this.state.user.first_name}&last_name=${this.state.user.last_name}&store=${this.state.user.store}&admin=${this.state.user.admin}&phone=${this.state.user.phone}&email=${this.state.user.email}`)
      .then(response => response.json())
      .then(data => console.log(data))
      // .then(this.getUser)
      .catch(err => console.error(err))
  }

  login = _ => {
    console.log("login");
    //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
    fetch(`http://tollo.duckdns.org:61338/login?username=${this.state.user.username}&password=${this.state.user.password}`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  cancelCourse = () => {
    document.getElementById("reg-form").reset();
  }

  renderUser = ({ user_id, username }) => <div key={user_id}>{username}</div>
  render() {
    const { users, user } = this.state;



    
    let message
    if (this.state.tab == "Store"){
      message = 
      <div>            
        <h1>My store and sales info:</h1>
        <div className="row offset-md-1">
          <div class="col-md-4" className="profile-pic">
            <span id="cameraIcon"></span>
            <span className="fas fa-camera" >Change Image</span>
          </div>
          <div class="col-md-4"><h5>My store statistics</h5>
          <h6>Total store sales last month: {this.state.totSales} SEK</h6>
          <h6>Total store profit last month: {this.state.totProfit} SEK</h6>
          <h6>Profit margin last month: {this.state.margin}%</h6>
          </div>
          <div class="col-md-4"><h5>My personal info</h5></div>
        </div>
      </div>
    }

    else if(this.state.tab == "Goals"){
      message = <div>Nu är det goals</div>
    }

    else if(this.state.tab == "Settings"){
      message = 
      <div>
        <h1>Profile Information:</h1>
        <h3>Username:</h3>
        <h3>Name:</h3>

        <div className="test">
          <h3>Phone Number: {this.state.oldNumber}</h3>
          <button className="ml-3" onClick={this.selectedButton.bind(this, "Goals")}>Change</button>
        </div>

        <div className="test">
          <h3>Email: {this.state.oldEmail}</h3>
          <button className="ml-3" onClick={this.selectedButton.bind(this, "Goals")}>Change</button>
        </div>

        <div className="test">
          <h3>Password:</h3>
          <button className="ml-3" onClick={this.selectedButton.bind(this, "Goals")}>Change</button>
        </div>

      </div>
    }

    
    return (

      
      <div className="App">
        <div class="btn-group btn-group-toggle mt-2 col-md-6" data-toggle="buttons">
          <label class="btn btn-secondary active btn-lg">
            <input type="radio" name="options" id="option1" autoComplete="off" onClick={this.selectedButton.bind(this, "Store")}></input> My store
          </label>
          <label class="btn btn-secondary btn-lg">
            <input type="radio" name="options" id="option2" autoComplete="off" onClick={this.selectedButton.bind(this, "Goals")}></input>
          My goals  
          </label>
          <label class="btn btn-secondary btn-lg ">
            <input type="radio" name="options" id="option3" autoComplete="off" onClick={this.selectedButton.bind(this, "Settings")}></input> Profile settings
          </label>
        </div>


        <div className="row">

          <div className="mt-2 col-md-10 offset-md-1" id="rightBar">
            {message}
          </div>

        </div>
        

      </div>
    );



  }
}

export default MyProfile;

// <div className="row ">
//     <div className=" col-xs-0 col-md-4 "></div>
//       <form className=" col-xs-1 col-md-4  shadow p-1 mb-2 bg-white rounded" onSubmit={this.submitHandler}>
//       <h1 className="text-dark">Change Password: </h1>
//       <div className="form-group">
//     <label for="exampleInputUsername1">Current Password:</label>
//       <input value={this.state.newPassword} type="password" className="form-control" id="exampleInputUserName1" placeholder="Current Password"
//         onChange={(this.passwordChangeHandler)}></input>
//   </div>
//   <div className="form-group">
//     <label for="exampleInputPassword11">New Password:</label>
//     <input value={this.state.newPassword} type="password" className="form-control" id="exampleInputPassword11" placeholder="New Password"
//     onChange={(this.passwordChangeHandler)}></input>

//   </div>
//   <button  className="btn btn-warning btn-lg ml-3"onClick={this.login}>Change Password</button>
//       </form>
//       </div>

//       <div className="row">
//     <div className=" col-xs-0 col-md-4 "></div>
//       <form className=" col-xs-1 col-md-4  shadow p-1 mb-2 bg-white rounded" onSubmit={this.submitHandler}>
//       <h1 className="text-dark">Current Email: </h1>
//       <div className="form-group">
//     <label for="exampleInputEmail">Current Password:</label>
//       <input value={this.state.newPassword} type="text" className="form-control" id="exampleInputEmail" placeholder="Current Email"
//         onChange={(this.passwordChangeHandler)}></input>
//   </div>
//   <div className="form-group">
//     <label for="exampleInputEmail2">New Email:</label>
//     <input value={this.state.newPassword} type="text" className="form-control" id="exampleInputEmail2" placeholder="New Email"
//     onChange={(this.passwordChangeHandler)}></input>

//   </div>
//   <button  className="btn btn-warning btn-lg ml-3"onClick={this.login}>Change Email</button>
//       </form>
//       </div>