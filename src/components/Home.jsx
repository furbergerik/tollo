import React, { useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import './Home.css';
import CountUp from 'react-countup';
import data from "../data";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Bar } from 'react-chartjs-2';


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
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  var listMonth = [];
  for (var i = 1; i < 13; i++) {
    var monthTot = sumArr(getDaylyData(year, i, dataType))
    listMonth.push(monthTot)
  }
  // console.log(listMonth, year)
  return [listMonth, monthNames]
}

function sumArr(arr) {
  //var arr=Object.values(obj)
  return arr.reduce(function (a, b) {
    return a + b
  }, 0);
}


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dates: []
    }
  }

  handleSelect = (e) => {
    const year = Number(e)
    const [neededData, dates] = getMonthlyData(year, "Total sales")
    let dateList = Object.keys(neededData);
    var totSalesList = [];
    for (var i in neededData) {
      totSalesList.push(neededData[i])
    }
    console.log("handleSelect: ", totSalesList);

    this.setState({
      data: neededData,
      dates: dates
    },
      () => {
        console.log("STATE  ", this.state.data)
      })
  };


  render() {
    return (
      <div className="home">
        <div className="container-fluid">
          <div className="row colGrid">
            {/* -------------col one------------ */}
            <div className="col-xs-12 colGrid  col-md-4 bg-warning">
              <DropdownButton
                alignRight
                title="Select year"
                id="dropdown-menu-align-right"
                onSelect={this.handleSelect.bind(this)}
              >
                <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
                <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
                <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
              </DropdownButton>

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

              <div className="row bg-light col2">
                <Bar
                  data={{
                    labels: this.state.dates,
                    datasets: [{
                      label: 'Data set #1',
                      data: this.state.data,
                      backgroundColor:
                        'rgba(255, 99, 132, 0.2)',
                      borderWidth: 1
                    },
                    ],
                  }}

                  options={{
                    maintainAspectRatio: true,
                    responsive: true,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          }
                        }
                      ]
                    }
                  }}
                />
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
}

export default Home;