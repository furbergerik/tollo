import React from "react";
import { Doughnut } from 'react-chartjs-2';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="row row1 px-10">



          {/* -------------col one------------ */}
          <div className="col-5 border firstCol gx-5">

            <div className="row bg-primary col1row1 gx-10">
              col 1, row 1
            </div>

            <div className="row col1row2 gx-10">
              col 2, row 2
            </div>

          </div>

          {/* -------------col two------------ */}
          <div className="col-xs-12 col-md-7 bg-warning">

            <div className="row bg-secondary col2row1 m-1">
              row 1 col 2
            </div>
            <div className="row bg-success m-1 col2row2">
              row 1 col 2
            </div>

          </div>




        </div>
      </div>
    </div>
  );
}

export default Home;