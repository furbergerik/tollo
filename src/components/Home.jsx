import React, { useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import './Home.css';
import CountUp from 'react-countup';
import data from "../store1";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Bar } from 'react-chartjs-2';
import { Multiselect } from 'multiselect-react-dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';
import { Col, Form } from "react-bootstrap"
import ProgressBar from 'react-bootstrap/ProgressBar'
import NumericInput from 'react-numeric-input';

async function getDataForOneDay(year, month, day, dataType) {
  const salesForOneDay = await getStoreData();
  var theDayData = salesForOneDay[year][month];
  var dailySales;
  for (var i in theDayData) {
    if (theDayData[i]["Day"] == day) {
      dailySales = theDayData[i][dataType];
    }
  }
  return dailySales;
}



async function getDaylyData(year, month, dataCategory, dataType, ID, storeNr) {
  const salesData = await getStoreData(dataCategory, ID, storeNr);
  var monthData = salesData[year][month];
  var listDay = [];
  for (var i in monthData) {
    listDay.push(monthData[i][dataType]);
  }
  return listDay;
}

async function getStoreData(dataCategory, ID, storeNr) {
  if (ID == 0) {
    var fetchingFrom = 'http://tollo.duckdns.org:61338/store' + storeNr + 'v2/' + dataCategory
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }

  else {
    var fetchingFrom = 'http://tollo.duckdns.org:61338/store' + storeNr + 'v2/' + dataCategory + '/' + ID
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }
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

async function getMonthlyData(year, dataCategory, dataType, Average, ID, storeNr) {
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  var listMonth = [];
  for (var i = 1; i < 13; i++) {
    var month = await getDaylyData(year, "m" + i, dataCategory, dataType, ID, storeNr)
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

function getYearlyData(dataCategory, dataType, ID, storeNr) {
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
    var yearTot = sumArr(getMonthlyData(year + i, dataCategory, dataType, false, ID, storeNr))
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
    multiOptions: [{ 'year': "2018" }, { 'year': "2019" }, { 'year': "2020" }],
    colorCount: 1,
    colorOptions: ['#F94144', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590']
  }

  // ---------------From DropDown---------------------
  handleYearSelect = async (e) => {

    const year = "y" + Number(e)


    const [neededData, dates] = await getMonthlyData(year, "totSales", "Total sales", false, 0, 1) //0 = totSales, 1 = store1
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
  onSelect = async (selectedList, selectedItem) => {
    console.log("Tjohej onSelect");
    console.log(selectedList)
    var year = Number(selectedItem.year);
    var yearFix = "y" + year;

    console.log(year)
    const [neededData, dates] = await getMonthlyData(yearFix, "totSales", "Total sales", false, 0, 1)

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

  onRemove(selectedList, removedItem) {
    console.log("Remove function");
    console.log("selectedList in remove: ", selectedList)
    console.log("removedItem in remove: ", removedItem.year);
    var currentList = this.state.dataSets;
    var updatedList = []
    currentList.forEach(element => {
      if (element.label != removedItem.year) {
        updatedList.push(element);
      }
    });
    console.log("updatedList ready to replace: ", updatedList);

    this.setState({
      dataSets: updatedList
    })
  }

  buttonClick(timePeriod) {
    console.log(timePeriod)
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
                  New members:
                <NumericInput className="form-control" />
                Product of the Month:
                <NumericInput className="form-control" />
                  <button className="submit-button">Submit</button>

                </div>


              </div>
            </div>

            {/* -------------col two------------ */}
            <div className="col-xs-12 col-md-8">
              {/* own store */}

              <div className="row col2">
                <div className="dep-container own-store">
                  <div className="store-window window-1">
                    <div className="myStoreTitleGrid">
                      <p className="myStoreTitle">Store 1</p>
                    </div>

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
                    {/* <div>
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
                    </div> */}

                    <div className="buttonGrid">

                      <div className="buttonGroupContainer">
                        <ButtonGroup aria-label="Basic example">
                          <Button variant="secondary" onClick={this.buttonClick('year')}>Year</Button>
                          <Button variant="secondary">Month</Button>
                          <Button variant="secondary">Week</Button>
                          <Multiselect
                            options={this.state.multiOptions} // Options to display in the dropdown
                            onSelect={this.onSelect.bind(this)} // Function will trigger on select event
                            onRemove={this.onRemove.bind(this)} // Function will trigger on remove event
                            displayValue="year" // Property name to display in the dropdown options
                          >
                          </Multiselect>
                        </ButtonGroup>
                      </div>
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
                    <div className="headline">Top Selling Store //(This Month)</div>
                    <div className="top1">Store 3</div>
                    <div className="top1-score"><CountUp end={1342} /> TKR</div>
                    <div className="top1">Store 1</div>
                    <div className="top1-score"><CountUp end={1132} /> TKR</div>
                    <div className="top1">Store 4</div>
                    <div className="top1-score"><CountUp end={954} /> TKR</div>
                    <div className="top1">Store 2</div>
                    <div className="top1-score"><CountUp end={758} /> TKR</div>
                    <div className="top1">Store 5</div>
                    <div className="top1-score"><CountUp end={654} /> TKR</div>
                  </div>
                  <div className="store-window window-4">
                    <div className="headline">Top Selling Store // (This Year)</div>
                    <div className="top1">Store 3</div>
                    <div className="top1-score"><CountUp end={16, 1} /> MkR</div>
                    <div className="top1">Store 1</div>
                    <div className="top1-score"><CountUp end={12, 3} /> MKR</div>
                    <div className="top1">Store 4</div>
                    <div className="top1-score"><CountUp end={12, 2} /> MKR</div>
                    <div className="top1">Store 2</div>
                    <div className="top1-score"><CountUp end={11, 0} /> MKR</div>
                    <div className="top1">Store 5</div>
                    <div className="top1-score"><CountUp end={10, 3} /> MKR</div>

                  </div>
                  <div className="store-window window-5">
                    <div className="headline">Product Of The Month Revenue</div>
                    <div className="top1">Store 3</div>
                    <div className="top1-score"><CountUp end={132} /> TKR</div>
                    <div className="top1">Store 1</div>
                    <div className="top1-score"><CountUp end={132} /> TKR</div>
                    <div className="top1">Store 4</div>
                    <div className="top1-score"><CountUp end={94} /> TKR</div>
                    <div className="top1">Store 2</div>
                    <div className="top1-score"><CountUp end={78} /> TKR</div>
                    <div className="top1">Store 5</div>
                    <div className="top1-score"><CountUp end={64} /> TKR</div>
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