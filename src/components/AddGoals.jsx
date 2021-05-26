import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Select from 'react-select';
import { Dropdown, DropdownButton } from "react-bootstrap";
import NumericInput from 'react-numeric-input';
import './AddGoals.css';



const cookies = new Cookies();
async function getUsersFromDepartment(store,department,admin) {
    console.log(store);
    console.log(department);
    console.log(admin);
    console.log("hola");
    var token = (cookies.get('jwt')).key;
    if(admin===1){
  
  //  var fetchingFrom = `http://192.168.0.111:61339/getUsersAdmin?store=${store}&department=${department}&token=${token}`
    var fetchingFrom = `http://tollo.duckdns.org:61338/getUsersAdmin?store=${store}&department=${department}&allUsers=${1}&token=${token}`
      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
      const finalSet = setOfData.data;
      return finalSet;
 
    }else{
        return "no";
    }
}

async function getUsersFromStore(store, admin){
  var token = (cookies.get('jwt')).key;
  if(admin===1){

//  var fetchingFrom = `http://192.168.0.111:61339/getUsersAdmin?store=${store}&department=${department}&token=${token}`
  var fetchingFrom = `http://tollo.duckdns.org:61338/getUsersAdmin?store=${store}&department=${1}&allUsers=${2}&token=${token}`
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;

  }else{
      return "no";
  }
}

async function updateGoal(username, member, count){
  console.log("målet är:");
  console.log(count);
  console.log(member);
  var token = (cookies.get('jwt')).key;
  var fetchingFrom = `http://tollo.duckdns.org:61338/updateGoal?username=${username}&member=${member}&count=${count}&token=${token}`
  await fetch(fetchingFrom);
}


class AddGoals extends Component {
    Constructor(){
      this.regUserChangeHandler=this.regUserChangeHandler.bind(this);
    }
    state={
        whatGoal: "",
        dropdownTitle: "Set selling goal for...",
        productOrMemberTitle: "Set product or membership goal",
        setNewGoal: true,
        goalSetFor: "",
        memberHasBeenChosen: false,
        departmentEmployees: [],
        departmentOptions: [],
        membership: 1,
        goal:'',
        employeeHasBeenChosen: false,
        selectedEmployee: '',
        selectOptions: [],
        users:[],
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
        target: "store",
        userInfo: [{
          username: '',
          firstName: '',
          lastName: '',
          store: 0,
          department: '',
          admin: 0
        }],
        employees: []
     }

    getUserInfo = async () => {
      console.log("tjo");
      var x = (cookies.get('username')).key;
      var token = (cookies.get('jwt')).key;
      var fetchingFrom = `http://tollo.duckdns.org:61338/getUsers?username=${x}&token=${token}`;
      //var fetchingFrom = `http://192.168.0.111:61339/getUsers?username=${x}&token=${token}`;
      
  
      const response = await fetch(fetchingFrom);
      const setOfData = await response.json();
      const finalSet = setOfData.data;
    
  
      var department = finalSet[0].department
      var departmentFix = department.replace('_', ' ')

      var userInfoArray = { username: finalSet[0].username, firstName: finalSet[0].first_name, lastName: finalSet[0].last_name, store: finalSet[0].store, department: departmentFix, admin: finalSet[0].admin }
      console.log(userInfoArray);
      this.setState({
        userInfo: userInfoArray
      })
    }

    callGetUsers=async()=>{
       
        const storeUsers = await getUsersFromStore(this.state.userInfo.store, this.state.userInfo.admin);
        console.log("anställda på department");
        this.setState({users: storeUsers});

        const options = (this.state.users).map(d=>({
          "value" : d.username,
          "label" : d.first_name + " " + d.last_name,
        }))
        this.setState({selectOptions: options});

        const departmentOptions = (this.state.users).map(d=>({
          "value" : d.department,
          "label" : d.department,
        }))
        const newDepartmentOptions = [];
        departmentOptions.forEach(obj => {
          if (!newDepartmentOptions.some(o => o.value === obj.value)) {
            newDepartmentOptions.push({ ...obj })
          }
        });
        this.setState({departmentOptions: newDepartmentOptions});


        /*for (var i in this.state.users){
          departmentOptions.push(this.state.users[i].department);
          console.log("tjotjo");
          console.log(departmentOptions);
        } */
        

      }

    setForWho=async(newTarget)=>{
      this.setState({target: newTarget});
      await this.callGetUsers();
      if (newTarget == "store"){
        this.setState({employeeHasBeenChosen: true})
        this.setState({goalSetFor: " everyone in your store"});
        this.setState({dropdownTitle: "Set goal for everyone in store"});
      }
      else if (newTarget == "employee"){
        this.setState({dropdownTitle: "Set goal for single employee"})
      }
      else if(newTarget == "department"){
        this.setState({dropdownTitle: "Set goal for everyone in department"})
      }
    }

    handleSelectedEmployee=(e)=>{
      this.setState({selectedEmployee: e.value});
      this.setState({goalSetFor: e.label});
      this.setState({employeeHasBeenChosen: true});
    }

    handleSelectedDepartment=async(e)=>{
      const finalSet=await getUsersFromDepartment(this.state.userInfo.store,e.value,this.state.userInfo.admin);
      this.setState({departmentEmployees: finalSet});
      this.setState({goalSetFor: "everyone working in " + e.value + " department"});
      this.setState({employeeHasBeenChosen: true});
    }

    memberOrProduct=(memberOrProduct)=>{
      if(memberOrProduct == "membership"){
        this.setState({membership: 1});
        this.setState({productOrMemberTitle: "Set membership goal"});
      }
      else{
        this.setState({membership: 2});
        this.setState({productOrMemberTitle: "Set product goal"});
      }
      this.setState({memberHasBeenChosen: true});
      this.setState({whatGoal: memberOrProduct});
    }

    goalValue=(e)=>{
      if(e == "undefined" || e<0){
        this.setState({goal: 0});
      }
      else{
        this.setState({goal: e});
      }
    }

    setGoal=async()=>{
      if (this.state.target == "employee"){
          await updateGoal(this.state.selectedEmployee, this.state.membership, this.state.goal);
      }
    
      else if(this.state.target == "department"){
        for(var i in this.state.departmentEmployees){
          await updateGoal(this.state.departmentEmployees[i].username, this.state.membership, this.state.goal);
        }
      }

      else if(this.state.target == "store"){
        for(var i in this.state.users){
          await updateGoal(this.state.users[i].username, this.state.membership, this.state.goal);
        }
      }
      this.setState({employeeHasBeenChosen: false});
      this.setState({setNewGoal: false});
      this.setState({target: "goalSet"});
    }

    setAnotherGoal=()=>{
      this.setState({setNewGoal:true});
      this.setState({target: ""});
      this.setState({dropdownTitle: "Set selling goal for..."});
      this.setState({productOrMemberTitle: "Set product or membership goal"});
    }

    componentDidMount(){
         if(!this.state.hasMounted){
            
            this.getUserInfo();
            this.setState({hasMounted:true});

        }
     }
   
    render() {
      console.log(this.state.target);
      let setAnotherGoal
      let productOrMember
      let message
      let decideGoal

      if (this.state.setNewGoal){
        setAnotherGoal = 
        <div>
        <DropdownButton id="dropdown-basic-button" title={this.state.dropdownTitle}>
          <Dropdown.Item href="#/setSellingGoalForEmployee" onClick={this.setForWho.bind(this, "employee")}>Single employee</Dropdown.Item>
          <Dropdown.Item href="#/setSellingGoalForDepartment" onClick={this.setForWho.bind(this, "department")}>Everyone in specific department</Dropdown.Item>
          <Dropdown.Item href="#/setSellingGoalForStore" onClick={this.setForWho.bind(this, "store")}>Everyone in store </Dropdown.Item>
        </DropdownButton>
        </div>
      }

      if (this.state.target == "employee"){
        message = 
        <div className="options">
          <h6>Select employee:</h6>
          <Select className="form-select" options={this.state.selectOptions} onChange={this.handleSelectedEmployee.bind(this)} title="Select employee" />
        </div>
      }
      else if (this.state.target == "department"){
        message = 
        <div className="options">
          <h6>Select department</h6>
          <Select options={this.state.departmentOptions} onChange={this.handleSelectedDepartment.bind(this)}/>
        </div>
      }
      else if(this.state.target == "store"){
        message = 
        <div></div>
      }
      else if(this.state.target == "goalSet"){
        message = 
        <div className="options">
        <h3>New {this.state.whatGoal} goal has been set for {this.state.goalSetFor} and the logged sales have been set to 0</h3>
        <button id="dropdown-basic-button" onClick={this.setAnotherGoal.bind(this)}>Set another goal</button>
        </div>
      }
      if(this.state.employeeHasBeenChosen){
        productOrMember = 
        <div>
          <DropdownButton id="dropdown-basic-button" title={this.state.productOrMemberTitle}>
            <Dropdown.Item href="#/setMembershipGoal" onClick={this.memberOrProduct.bind(this, "membership")}>Set membership goal</Dropdown.Item>
            <Dropdown.Item href="#/setProductGoal" onClick={this.memberOrProduct.bind(this, "product")}>Set product goal</Dropdown.Item>
          </DropdownButton>
        </div>
      if(this.state.memberHasBeenChosen){
        decideGoal = 
        <div className="options">
          <h6>Set amount to reach:</h6>
          <NumericInput className="form-control" onChange={this.goalValue.bind(this)}/>
          <button className="submit-button" onClick={this.setGoal.bind(this)}>Add goal and reset logged sales</button>
        </div>
      }
      }

      return(
      
      <div className="App">
        <div className="contain">
        <div>{setAnotherGoal}</div>
        <div>{message}</div>
        <div>{productOrMember}</div>
        <div>{decideGoal}</div>
        </div>
      </div>
      
  
      )
  }
  }
  
  export default AddGoals;