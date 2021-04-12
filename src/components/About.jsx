import React from "react";
import './About.css';
class About extends React.Component {
  state={
    Vegard: false,
    Olle:false,
    Hugo: false,
    Erik: false,

  };
  handleClick= ()=> {
    
    this.setState({ Vegard: !this.state.Vegard})
    
  };
  render (){
  return(
    
    <div className="about">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
          <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>

          <div class="col-lg-5">
            
            <h1 class="font-weight-light">Our Product</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        </div>
        <div className="container">
          <div class="container-fluid" > 
            <h2>Våra slavar</h2>
          </div>  
          <div class="row">
            <div class="col-sm-3">
              <img class="rounded-circle person" src="https://pbs.twimg.com/profile_images/2991811244/6ddc9f3ecebe173f4384cba3f5d43e6b_400x400.jpeg" alt="hejhej" ></img>
              <h3 class="text-center"><strong>Vegard Pettersson</strong></h3>
              {!this.state.Vegard && <p>Hejsan mina bekanta</p>}
              {this.state.Vegard && <p>Hejsan mina bekanta Hi my fellow fellows</p>}
              <button onClick={() => this.setState({ Vegard: !this.state.Vegard })} class="btn btn-outline-secondary">Show More!</button>
              
             </div>
            <div class="col-sm-3">
              <img class="rounded-circle person"src="https://media-exp1.licdn.com/dms/image/C4D03AQH2N0NbzF-EAg/profile-displayphoto-shrink_200_200/0/1579166871104?e=1622678400&v=beta&t=5yRyUkyY375YmSzmPwkBQnBrf-f5KT3aEgy8r1h91qc" alt="hejhej" ></img>
              <h3 class="text-center"><strong>Olle Kindvall</strong></h3>
              {!this.state.Olle && <p>Hejsan mina bekanta</p>}
              {this.state.Olle && <p>Hejsan mina bekanta Hi my fellow fellows</p>}
              <button onClick={() => this.setState({ Olle: !this.state.Olle })} class="btn btn-outline-secondary">Show More!</button>
            </div>
            <div class="col-sm-3">
              <img class="rounded-circle person" src="https://pbs.twimg.com/media/Cc7_4_PXEAAcwmQ?format=jpg&name=900x900" alt="hejhej" ></img>
              <h3 class="text-center"><strong>Hugo Sjönneby</strong></h3>
              {!this.state.Hugo && <p>Hejsan mina bekanta</p>}
              {this.state.Hugo && <p>Hejsan mina bekanta Hi my fellow fellows</p>}
              <button onClick={() => this.setState({ Hugo: !this.state.Hugo })} class="btn btn-outline-secondary">Show More!</button>
            </div>
            <div class="col-sm-3">
              <img class="rounded-circle person" src="https://pbs.twimg.com/profile_images/430358305731805184/0A_ORIzH.jpeg" alt="hejhej" ></img>
              <h3 class="text-center"><strong>Erik Furberg</strong></h3>
              {!this.state.Erik && <p>Hejsan mina bekanta</p>}
              {this.state.Erik && <p>Hejsan mina bekanta Hi my fellow fellows</p>}
              <button onClick={() => this.setState({ Erik: !this.state.Erik })} class="btn btn-outline-secondary">Show More!</button>
            </div>
          </div>
         
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
          <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>

          <div class="col-lg-5">
            
            <h1 class="font-weight-light">Our Inspiration</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        </div>  
    </div>
    
  );
  }
}



export default About;