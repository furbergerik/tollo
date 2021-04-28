import React, { useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import './Home.css';
import CountUp from 'react-countup';
import data from "../store1.json";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Bar } from 'react-chartjs-2';
import { Multiselect } from 'multiselect-react-dropdown';
import { Col, Form } from "react-bootstrap"


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

function getMonthlyData(year, dataType) {
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  var listMonth = [];
  for (var i = 1; i < 13; i++) {
    var monthTot = sumArr(getDaylyData(year, i, dataType))
    listMonth.push(monthTot)
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


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      datasets: [
      ]
      ,
      dates: [],
      multiOptions: [{ year: "2018" }, { year: "2019" }, { year: "2020" }]
    }
  }

  handleSelect = (e) => {

    const year = Number(e)
    const [neededData, dates] = getMonthlyData(year, "Total sales")
    // let dateList = Object.keys(neededData);
    var totSalesList = [];
    for (var i in neededData) {
      totSalesList.push(neededData[i])
    }
    console.log("handleSelect: ", totSalesList);

    this.setState({
      dataset: neededData,
      dates: dates


    },
      () => {
        console.log("STATE  ", this.state.data)
      })
  };

  onSelect(selectedList, selectedItem) {
    console.log("Tjohej onSelect");
    console.log(selectedList)
    const year = Number(selectedItem.year);
    console.log(year)
    const [neededData, dates] = getMonthlyData(year, "Total sales")
    // let dateList = Object.keys(neededData);
    var totSalesList = [];
    for (var i in neededData) {
      totSalesList.push(neededData[i])
    }

    this.setState({
      dataset: neededData,
      dates: dates
    },
      () => {
        console.log("STATE  ", this.state.data)
      })

  }

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


              {/* <Form.Group as={Col} controlId="my_multiselect_field">
                <Form.Label>My multiselect</Form.Label>
                <Form.Control as="select" multiple value={field} onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                  <option value="field1">Field 1</option>
                  <option value="field2">Field 2</option>
                  <option value="field3">Field 3</option>
                </Form.Control>
              </Form.Group> */}

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
                      data: this.state.dataset,
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