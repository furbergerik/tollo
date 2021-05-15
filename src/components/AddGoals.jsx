import React, { Component } from 'react';
//import './Registration.css';
import Cookies from 'universal-cookie'

const cookies = new Cookies();
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
class  Registration extends Component {
    Constructor(){
      this.regUserChangeHandler=this.regUserChangeHandler.bind(this);
    }
    state={
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        store: '',
        admin:0,
        department:''
     }
     componentDidMount(){


     }
   
    render() {
      return(
        <div>

        
     
    </div>
      )
  }
  }
  
  export default Registration;