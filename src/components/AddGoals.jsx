import React, { Component } from 'react';
//import './Registration.css';
import Cookies from 'universal-cookie';
import { Multiselect } from 'multiselect-react-dropdown';
import { Dropdown, MenuItem, DropdownButton } from "react-bootstrap";



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
        target: "employee",
        employees: []
     }
    callGetUsers=async()=>{
        console.log("här");
       
        const finalSet=await getUsers(this.state.user.store,this.state.user.department,this.state.user.admin);
        console.log(finalSet);
        this.setState({user:finalSet});
      }

    setForSingleEmployee=()=>{
      this.setState({target: "employee"});
    }

    setForDepartment=()=>{
      this.setState({target: "department"});
    }

    setForStore=()=>{
      this.setState({target: "store"});
    }

    componentDidMount(){
      console.log("hejeee");
      console.log(this.state.multiOptions);
         if(!this.state.hasMounted){
            this.callGetUsers.bind(this);
            this.setState({hasMounted:true});

        }
     }
   
    render() {
      console.log(this.state.target);
      let employees = []
      let message
      for (var index in this.state.employees){
        employees.push(<DropdownButton id={index} title={(this.state.employees[index]).name + (this.state.employees[index]).name}></DropdownButton>)
      }
      if (this.state.target == "employee"){
        message = 
        <DropdownButton id="dropdown-basic-button" title="Choose employee">
          <Dropdown.Item href="#/action-1" onClick={this.setForSingleEmployee.bind(this)}>Single employee</Dropdown.Item>
        </DropdownButton>

      }
      return(
      
      <div className="App">

        <DropdownButton id="dropdown-basic-button" title="Set selling goal for...">
          <Dropdown.Item href="#/action-1" onClick={this.setForSingleEmployee.bind(this)}>Single employee</Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={this.setForDepartment.bind(this)}>Everyone in specific department</Dropdown.Item>
          <Dropdown.Item href="#/action-3" onClick={this.setForStore.bind(this)}>Everyone in store </Dropdown.Item>
        </DropdownButton>
      
        <div>{message}</div>

      </div>
      
  
      )
  }
  }
  
  export default AddGoals;