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



async function getDaylyData(year, month, dataType) {
  const salesData = await getStore1TotSales();
  var monthData = salesData[year][month];
  var listDay = [];
  for (var i in monthData){
    listDay.push(monthData[i][dataType]);
  }
  return listDay
}

async function getStore1TotSales(){
  const response = await fetch('http://tollo.duckdns.org:61338/store1v2/totSales');
  const setOfData = await response.json();
  const test = setOfData.data;
  return test;
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

async function getMonthlyData(year, dataType, Average) {
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  var listMonth = [];
  for (var i = 1; i < 13; i++) {
    var month = await getDaylyData(year, "m"+i, dataType)
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
    dataSets: [0],
    dates: [],
    multiOptions: [{ year: "y2018" }, { year: "y2019" }, { year: "y2020" }]
  }




  // ---------------From DropDown---------------------
  handleYearSelect = async(e) => {

    const year = "y"+Number(e)

    
    const [neededData, dates] = await getMonthlyData(year, "Total sales")
    // let dateList = Object.keys(neededData);
    var totSalesList = [];
    for (var i in neededData) {
      totSalesList.push(neededData[i])
    }
    console.log("handleSelect: ", totSalesList);
    const newBar = { label: Number(e), data: neededData, backgroundColor: 'rgba(255, 99, 132, 0.2)', borderWidth: 1 }

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
    const [neededData, dates] = getMonthlyData(year, "Total sales")

    var totSalesList = [];
    for (var i in neededData) {
      totSalesList.push(neededData[i])
    }
    const newBar = { label: year, data: neededData, backgroundColor: 'rgba(255, 99, 132, 0.2)', borderWidth: 1 }

    if (this.state.dataSets == 0) {
      console.log("Fanns ingen dataSet från början");
      this.setState({
        dataSets: newBar,
        dates: dates
      },
        () => {
          console.log("STATE  ", this.state.dataSets)
        })
    } else {
      console.log("!!Fanns nått i dataSet!!");
      console.log("Gamla state:", this.state.dataSets);

      let oldBar = this.state.dataSets

      console.log("NewBar:", newBar);
      console.log("OldBar", oldBar);

      let updatedBar = [oldBar, newBar];
      console.log("updatedBar: ", updatedBar);


      // ---- RESET ----
      // this.resetState();

      // ---UPDATE
      this.setState({
        dataSets: updatedBar,
        dates: dates
      },
        () => {
          console.log("UPDATED state:  ", this.state.dataSets)
        })
    }
  }
  resetState() {
    this.setState({
      dataSets: [{
        label: 'test',
        data: [1, 2, 4, 4, 5],
        backgroundColor:
          'rgba(255, 99, 132, 0.2)',
        borderWidth: 1
      },
      {
        label: 'test2',
        data: [10, 22, 4, 4, 5],
        backgroundColor:
          'rgba(255, 99, 132, 0.2)',
        borderWidth: 1
      }],
      dates: ['blipp', 'blapp', 'sdf', 'asd', 'iou']
    },
      () => {
        console.log("RESET state:  ", this.state.dataSets)
      })

    console.log("State resettad!")
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

             
              </div>
            </div>

            {/* -------------col two------------ */}
            <div className="col-xs-12 col-md-8">
              {/* own store */}



              <div className="row col2">
                <div className="dep-container own-store">
                  <div className="store-window window-1">

                  </div>
                  <div className="store-window window-2">

                  </div>
                  {/* <div className="myStore">
                  <Bar
                    data={{
                      labels: this.state.dates,
                      datasets: [this.state.dataSets]
                    }}

                    options={{
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
                <div className="col-3 border">
                  <h1 className="border">stats!!</h1>
                  <div>div</div>
                  <div>div</div>
                  <div>div</div>
                  <div className="border">div</div>
                </div>


                <div className="row23">
                  <div className="bg-primary dropDownButton">
                    <DropdownButton
                      alignRight
                      title="Select year"
                      id="dropdown-menu-align-right"
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
                  <div className="headline">Top Selling Store</div>
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
                    <div className="store-window window-5">
                    <div className="headline">Top Selling Store</div>
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
                {/* <div className="myStore">
                  <Bar
                    data={{
                      labels: this.state.dates,
                      datasets: [this.state.dataSets]
                    }}

                    options={{
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



                <div className="row-float row23">
                  <div className="bg-primary dropDownButton">
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
                  </div>
                </div> */}

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