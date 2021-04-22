import React from "react";
import { Doughnut } from 'react-chartjs-2';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="container-fluid">
        <div className="row colGrid">



          {/* -------------col one------------ */}
          <div className="col-xs-12 colGrid  col-md-4 bg-warning">
            col 1
          </div>

          {/* -------------col two------------ */}
          <div className="col-xs-12 col-md-8 bg-warning colGrid">

            <div className="row bg-secondary col2">
              row 1 col 2
            </div>
            <div className="row bg-success col2">
              row 2 col 2
            </div>

          </div>




        </div>
      </div>
    </div>
  );
}

export default Home;