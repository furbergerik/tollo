import React, { useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import './Home.css';
import CountUp from 'react-countup';
import data from "../store1";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Bar } from 'react-chartjs-2';
import { Multiselect } from 'multiselect-react-dropdown';
import { Col, Form } from "react-bootstrap"
import ProgressBar from 'react-bootstrap/ProgressBar'

function getDaylyData(year, month, dataType) {
  var salesData = data["totSales"];
  var listDay = [];
  for (var i in salesData) {
    if (salesData[i]["Year"] == year && salesData[i]["Month"] == month) {
      listDay.push(salesData[i][dataType])
    }
  }
  //console.log("ny test:  ",listDay)
  return listDay
}



function getWeeklyDaylyData(year, week, dataType) {
  var salesData = data["totSales"];
  var listDayInWeek = [];
  if (week == 1) {
    for (var i in salesData) {
      if (salesData[i]["Year"] == year && salesData[i]["Week"] == week && salesData[i]["Month"] == 1) {
        listDayInWeek.push(salesData[i][dataType])
      }
      else if (salesData[i]["Year"] == year - 1 && salesData[i]["Week"] == week && salesData[i]["Month"] == 12) {
        listDayInWeek.push(salesData[i][dataType])
      }
    }
  }
  else {
    for (var i in salesData) {
      if (salesData[i]["Year"] == year && salesData[i]["Week"] == week) {
        listDayInWeek.push(salesData[i][dataType])
      }
    }
  }
  //console.log("ny test:  ",listDay)
  return listDayInWeek
}

function getMonthlyData(year, dataType, Average) {
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  var listMonth = [];
  for (var i = 1; i < 13; i++) {
    var month = getDaylyData(year, i, dataType)
    if (Average) {
      month = sumArr(month) / month.length
      listMonth.push(month)
    }
    else {
      month = sumArr(month)
      listMonth.push(month)
    }
  }

  return [listMonth, monthNames]
}

function getYearlyData(dataType) {
  var salesData = data["totSales"];
  var listYear = [];
  var year = salesData[0]["Year"];
  var labelYear = [year];
  var yearCount = 1;
  for (var i in salesData) {
    if (year != salesData[i]["Year"]) {
      yearCount += 1;
      year = salesData[i]["Year"]
      labelYear.push(year)
    }
  }
  year = year - yearCount + 1
  for (var i = 0; i < yearCount; i++) {
    var yearTot = sumArr(getMonthlyData(year + i, dataType))
    listYear.push(yearTot)
  }
  console.log(labelYear)
  return { labelYear, listYear }
}



function sumArr(arr) {
  //var arr=Object.values(obj)
  return arr.reduce(function (a, b) {
    return a + b
  }, 0);
}

// function soldProduct(year, month, productId){
//   var salesData = data["prodSales"];
//   var amountOfProduct = 0;
//   salesData[0]["prod Id"]
//   for(var i in salesData){
//     // if(salesData[i]["Year"] == year && salesData[i]["Month"] == month && salesData[i]["prod Id"] == productId){
//     //   amountOfProduct += salesData[i]["Sales"]
//     // }
//   }
//   return amountOfProduct;
// }

//console.log(soldProduct(2018, 1, 1));

class Home extends React.Component {

  state = {
    dataSets: [{
      label: 'Store progress',
      data: [1, 2, 4, 8, 16, 32, 64, 128, 254, 508, 1016, 2032],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderWidth: 1
    }],
    dates: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'],
    numberOfBars: 0,
    multiOptions: [{ year: "2018" }, { year: "2019" }, { year: "2020" }],
    colorCount: 1,
    colorOptions: ['#F94144', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590']
  }

  // ---------------From DropDown---------------------
  handleYearSelect = (e) => {

    const year = Number(e)
    const [neededData, dates] = getMonthlyData(year, "Total sales")
    // let dateList = Object.keys(neededData);
    var totSalesList = [];
    for (var i in neededData) {
      totSalesList.push(neededData[i])
    }
    console.log("handleSelect: ", totSalesList);
    var newBar = { label: "Revenue:  " + year, data: neededData, backgroundColor: 'rgba(255, 99, 132, 0.2)', borderWidth: 1 }
    newBar = [newBar];
    this.setState({
      dataSets: newBar,
      dates: dates
    },
      () => {
        console.log("STATE  ", this.state.dataSets)
      })
  };

  // ---------------From MultiSelect---------------------
  onSelect(selectedList, selectedItem) {
    console.log("Tjohej onSelect");
    console.log(selectedList)
    const year = Number(selectedItem.year);
    console.log(year)
    var [neededData, dates] = getMonthlyData(year, "Total sales")

    var totSalesList = [];
    for (var i in neededData) {
      totSalesList.push(neededData[i])
    }
    var newBar = { label: year, data: neededData, backgroundColor: '#F94144', borderWidth: 1 }

    if (this.state.dataSets[0].label == 'Store progress') {
      console.log("Fanns ingen dataSet från början");
      this.setState({
        dataSets: [newBar],
        dates: dates,
        numberOfBars: 1
      },
        () => {
          console.log("STATE  ", this.state.dataSets)
        })
    } else {
      // test-loggar
      console.log("!!Fanns nått i dataSet!!");

      // color generation---
      var localColorCount = this.state.colorCount;
      if (localColorCount < 6) {
        newBar.backgroundColor = this.state.colorOptions[localColorCount]
        this.setState({
          colorCount: localColorCount + 1
        })
      }
      if (localColorCount == 6) {
        newBar.backgroundColor = this.state.colorOptions[localColorCount]
        this.setState({
          colorCount: 0
        })
      }
      //---Make new array for state--
      var oldBar = this.state.dataSets;
      console.log("OldBar ofixad: ", oldBar);
      var updatedBar = [];
      if (this.state.numberOfBars == 1) {
        updatedBar = [oldBar[0], newBar];
      } else {
        updatedBar = oldBar.concat(newBar);
      }

      // ---UPDATE
      var localNumberOfBars = this.state.numberOfBars;
      this.setState({
        dataSets: updatedBar,
        dates: dates,
        numberOfBars: localNumberOfBars + 1
      },
        () => {
          console.log("UPDATED state:  ", this.state.dataSets)
        })
    }
  }


  render() {
    return (
      <div className="home">
        <div className="container-fluid h-100">
          <div className="row colGrid">
            {/* -------------col one------------ */}
            <div className="col-xs-12 colGrid col1 col-md-4" >
              <div className="dep-container individual">
                <div className="progress-window">
                  <img className="rounded-circle person profile-pic" src="https://media-exp1.licdn.com/dms/image/C4D03AQH2N0NbzF-EAg/profile-displayphoto-shrink_200_200/0/1579166871104?e=1622678400&v=beta&t=5yRyUkyY375YmSzmPwkBQnBrf-f5KT3aEgy8r1h91qc" alt="hejhej" ></img>
                  <h4>Welcome back Olle!</h4>
                </div>
                <div className="progress-window">
                  Goal 1:
  <ProgressBar variant="success" animated now={40} label={`${40}%`} />
  Goal 2:
  <ProgressBar variant="info" animated now={20} label={`${20}%`} />
  Goal 3:
  <ProgressBar variant="warning" animated now={60} label={`${60}%`} />
  Goal 4:
  <ProgressBar variant="danger" animated now={80} label={`${80}%`} />
                </div>
                <div className="progress-window">
                  Goal 1:
  <ProgressBar variant="success" animated now={40} label={`${40}%`} />
  Goal 2:
  <ProgressBar variant="info" animated now={20} label={`${20}%`} />
  Goal 3:
  <ProgressBar variant="warning" animated now={60} label={`${60}%`} />
  Goal 4:
  <ProgressBar variant="danger" animated now={80} label={`${80}%`} />
                </div>

                <CountUp
                  start={0}
                  end={22020202}
                  duration={2.75}
                  separator=" "
                  decimals={1}
                  decimal=","
                  suffix=" SEK"
                >
                  {({ countUpRef, start }) => (
                    <div>
                      <span ref={countUpRef} />
                      <button onClick={start}>Start</button>
                    </div>
                  )}
                </CountUp>
              </div>
            </div>

            {/* -------------col two------------ */}
            <div className="col-xs-12 col-md-8">
              {/* own store */}



              <div className="row col2">
                <div className="dep-container own-store">
                  <div className="store-window window-1">
                    <p className="myStoreTitle">Store 1</p>
                    <div className="myStore">
                      <Bar
                        data={{
                          labels: this.state.dates,
                          datasets: this.state.dataSets
                        }}

                        options={{
                          backgroundColor: "red",
                          maintainAspectRatio: false,
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


                    <div>
                      <div className="dropDownButton">
                        <DropdownButton
                          alignRight
                          title="Select year"
                          id="dropdown-menu-align-right"
                          size="sm"
                          variant="secondary"
                          onSelect={this.handleYearSelect.bind(this)}
                        >
                          <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
                          <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
                          <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
                        </DropdownButton>
                      </div>
                      <Multiselect
                        options={this.state.multiOptions} // Options to display in the dropdown
                        onSelect={this.onSelect.bind(this)} // Function will trigger on select event
                        onRemove={this.onRemove} // Function will trigger on remove event
                        displayValue="year" // Property name to display in the dropdown options
                      >
                        {/* <Multiselect.Item eventKey="2018">2018</Multiselect.Item>
                        <Multiselect.Item eventKey="2019">2019</Multiselect.Item>
                        <Multiselect.Item eventKey="2020">2020</Multiselect.Item> */}
                      </Multiselect>
                    </div>

                  </div>
                  <div className="store-window window-2">

                    <div className="storeDetails">
                      <div className="myStoreTitle">This Month:</div>
                      <div className="monthInfo">
                        <div>Top department:</div>
                        <div className="textRight">
                          <div>Outdoor:</div>
                          <div>
                            <CountUp
                              start={0}
                              end={31634}
                              duration={2.75}
                              separator=" "
                              decimals={0}
                              decimal=","
                              suffix=" SEK"
                            >
                            </CountUp>
                          </div>
                        </div>
                        <div className="borderTop">Product of the Month:</div>
                        <div className="productOfMonth textRight borderTop">Air Force 1 - Nike</div>
                      </div>
                    </div>

                    <p className="myStoreTitle topSellers">Top sellers:</p>

                    <div className="scrollTopList">
                      <div className="topSeller">1. Olle Kindvall</div>
                      <div className="topSeller">2. Georgios</div>
                      <div className="topSeller">3. Vegge P</div>
                      <div className="topSeller">4. Hugo Sjönneby</div>
                      <div className="topSeller">5. Georgios</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* -------OTHER STORES------ */}
              <div className="row col2">
                <div className="dep-container other-store">
                  <div className="store-window window-3">

                  </div>
                  <div className="store-window window-4">

                  </div>
                  <div className="store-window window-5">

                  </div>
                </div>
              </div>
            </div>




          </div>
        </div>
      </div>
    );
  }
}

export default Home;