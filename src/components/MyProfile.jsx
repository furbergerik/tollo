import { Component } from 'react';
import './MyProfile.css';
import Cookies from 'universal-cookie';
//http://tollo.duckdns.org
//192.168.0.111ä
const cookies = new Cookies();


async function getStoreData(dataCategory, ID, storeNr){
  if (ID == 0) {
    var token = (cookies.get('jwt')).key;
  //  var fetchingFrom = 'http://tollo.duckdns.org:61338/store' + storeNr + 'v2/' + dataCategory + '?token=' + token
    var fetchingFrom = 'http://192.168.0.111:61339/store' + storeNr + 'v2/' + dataCategory + '?token=' + token
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }

  else {
    var token = (cookies.get('jwt')).key;
   // var fetchingFrom = 'http://tollo.duckdns.org:61338/store' + storeNr + 'v2/' + dataCategory + '/' + ID + '?token=' + token
    var fetchingFrom = 'http://192.168.0.111:61339/store' + storeNr + 'v2/' + dataCategory + '/' + ID + '?token=' + token
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }
}

async function getDepartmentProducts(departmentId) {
  var token = (cookies.get('jwt')).key;
  //var fetchingFrom = `http://tollo.duckdns.org:61338/store1v2/department?department=${departmentId}&token=${token}`
  var fetchingFrom = `http://192.168.0.111:61339/store1v2/department?department=${departmentId}&token=${token}`
  const response = await fetch(fetchingFrom);
  const setOfData = await response.json();
  const finalSet = setOfData.data;
  console.log()
  return finalSet;
}


async function getMonthlyProductData(year, month, dataCategory, dataType, storeNr, departmentId){
  var listMonth = [];
  var listMonthProd = []
  var productIdList = await getDepartmentProducts(departmentId)
  console.log(productIdList)
  for (var i in productIdList) {
  var salesData = await getStoreData(dataCategory, 'p'+productIdList[i], storeNr);
  console.log(salesData)
  var monthData = salesData['y'+year]['m'+month];
  var listDay = 0;
    for (var j in monthData) {
      listDay+=monthData[j][dataType];
    }
      var depName=monthData[0]["Title"]
      listMonth.push(listDay)
      listMonthProd.push(depName)
    }
    bubbleSort(listMonth, listMonthProd)
    return [listMonth, listMonthProd]

}

async function getMonthlyDepartmentData(year, month, dataCategory, dataType, storeNr){
  var listMonth = [];
  var listMonthDep = []
  console.log("department: ",getDepartmentProducts(0))
  if(month == 0){
  }
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
    }
    bubbleSort(listMonth, listMonthDep)
    return [listMonth, listMonthDep]
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

function sumArr(arr) {
  //var arr=Object.values(obj)
  return arr.reduce(function (a, b) {
    return a + b
  }, 0);
}

//Fuckar upp med fetchen om funktioner körs här
//console.log(getMonthlyProductData(2020, 12, "prodSales", "Sales", 1, 8))

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
    margin: "",
    store: "",
    department: ""
    
  }
  props = {
    olle: null

  }

  getUserInfo = async(userType) => {
    var x = (cookies.get('username')).key;
    var token = (cookies.get('jwt')).key;
    //var fetchingFrom = 'http://tollo.duckdns.org:61338/getUsers?username=' + x + '&token=' +token;
    var fetchingFrom = 'http://192.168.0.111:61339/getUsers?username=' + x + '&token=' +token;
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    if (userType == "store"){
      return finalSet[0].store;
    }
    else if (userType == "department"){
      return finalSet[0].department;
    }
  }

  getMonthlyData = async(year, month, dataCategory, dataType, ID, storeNr) => {
    const salesData = await getStoreData(dataCategory, ID, storeNr);
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
    this.setState({store: await this.getUserInfo("store")});
    this.setState({department: await this.getUserInfo("department")})
    this.setState({totSales: await this.getMonthlyData("y2020", "m12", "totSales", "Total sales", 0, this.state.store)});
    this.setState({totProfit: await this.getMonthlyData("y2020", "m12", "totSales", "Profit exl. tax", 0, this.state.store)});
    this.setState({margin: await this.getMonthlyData("y2020", "m12", "totSales", "Profit %", 0, this.state.store)});
  }

  addUser = _ => {
    console.log("wtf");
    //const {user}=this.state.user;
    console.log(this.state.user.username);
    //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
    var token = (cookies.get('jwt')).key;
    //fetch(`http://tollo.duckdns.org:61338/add?username=${this.state.user.username}&password=${this.state.user.password}&first_name=${this.state.user.first_name}&last_name=${this.state.user.last_name}&store=${this.state.user.store}&admin=${this.state.user.admin}&phone=${this.state.user.phone}&email=${this.state.user.email}&token=${token}`)
    fetch(`http://192.168.0.111:61339/add?username=${this.state.user.username}&password=${this.state.user.password}&first_name=${this.state.user.first_name}&last_name=${this.state.user.last_name}&store=${this.state.user.store}&admin=${this.state.user.admin}&phone=${this.state.user.phone}&email=${this.state.user.email}&token=${token}`)
      .then(response => response.json())
      .then(data => console.log(data))
      // .then(this.getUser)
      .catch(err => console.error(err))
  }

  login = _ => {
    console.log("login");
    //const {username,password,first_name,last_name,store,admin,phone,email}=req.query; 
    var token = (cookies.get('jwt')).key;
   // fetch(`http://tollo.duckdns.org:61338/login?username=${this.state.user.username}&password=${this.state.user.password}&token=${token}`)
    fetch(`http://192.168.0.111:61339/login?username=${this.state.user.username}&password=${this.state.user.password}&token=${token}`)
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
            <span className="spanFix" id="cameraIcon"></span>
            <span className="spanFix fas fa-camera" >Change Image</span>
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
        <div class="btn-group btn-group-toggle mt-2 col-md-6 container-my-profile" data-toggle="buttons">
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

          <div className="mt-2 col-md-10 offset-md-1 container-my-profile" id="rightBar">
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