import React from "react";
import { Doughnut } from 'react-chartjs-2';
import './Home.css';


function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="row row1 g-5">

          {/* -------------col one------------ */}
          <div className="col-5 border firstCol">

            <div className="row shadow bg-light col1row1">
              <h1>col 1, row 1</h1>
            </div>

            <div className="row shadow bg-light col1row2">
              <h1>col 1, row 2</h1>
            </div>

          </div>

          {/* -------------col two------------ */}
          <div className="col border secondCol">

            <div className="row bg-secondary col2row1 m-lg">
              row 1 col 2
            </div>
            <div className="row bg-success col2row2">
              row 1 col 2
            </div>

          </div>




        </div>
      </div>
    </div>
  );
}

export default Home;