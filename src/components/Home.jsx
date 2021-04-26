import React from "react";
import { Doughnut } from 'react-chartjs-2';
import './Home.css';
import CountUp from 'react-countup';
import data from "../data";
import { Bar } from 'react-chartjs-2';

var totSalesList = [];

function getDaylyData(year, month, dataType) {
  var salesData = data["totSales"];
  var listDay = [];
  for (var i in salesData) {
    if (salesData[i]["Year"] == year && salesData[i]["Month"] == month) {
      listDay.push(salesData[i][dataType])
    }
  }

  return listDay
}

function getMonthlyData(year, dataType) {
  var listMonth = [];
  for (var i = 1; i < 13; i++) {
    var monthTot = sumArr(getDaylyData(year, i, dataType))
    listMonth.push(monthTot)
  }
  console.log(listMonth, year)
  // return listMonth
}

function sumArr(arr) {
  //var arr=Object.values(obj)
  return arr.reduce(function (a, b) {
    return a + b
  }, 0);
}


function Home() {

  return (
    <div className="home">
      <div className="container-fluid">
        <div className="row colGrid">
          {/* -------------col one------------ */}
          <div className="col-xs-12 colGrid  col-md-4 bg-warning">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pick year!
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#1" onClick={getMonthlyData(2018, "Total sales")}>2018</a>
                <a class="dropdown-item" href="#2" onClick={getMonthlyData(2019, "Total sales")}>2019</a>
                <a class="dropdown-item" href="#3" onClick={getMonthlyData(2020, "Total sales"), console.log('klickade 2020')}>2020</a>
              </div>
            </div>
            <CountUp
              start={-875.039}
              end={160527.012}
              duration={2.75}
              separator=" "
              decimals={4}
              decimal=","
              prefix="EUR "
              suffix=" left"
              onEnd={() => console.log('Ended! 👏')}
              onStart={() => console.log('Started! 💨')}
            >
              {({ countUpRef, start }) => (
                <div>
                  <span ref={countUpRef} />
                  <button onClick={start}>Start</button>
                </div>
              )}
            </CountUp>
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