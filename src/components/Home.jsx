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

async function getWeeklyDaylyData(year, week, dataCategory, dataType, ID, storeNr) {
  const salesData = await getStoreData(dataCategory, ID, storeNr);
  console.log("salesData: ", salesData)
  var listDayInWeek = [];
  var yearLevel = salesData[year]
  for (var i in yearLevel) {
    var monthLevel = yearLevel[i]
    for (var i in monthLevel) {
      if (monthLevel[i]['Week'] == week) {
        // console.log("Denna ska vi spara!! ", monthLevel[i]);
        listDayInWeek.push(monthLevel[i])
      }
    }
  }

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
    multiOptions: [
      { 'year': "2018" },
      { 'year': "2019" },
      { 'year': "2020" }],
    colorCount: 1,
    colorOptions: ['#F94144', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590'],
    activePeriod: 'year',
    year: '2018',
    singleSelect: "false",
    yearSelected: "false",
    selectedYear: '',
    initialDataSet: [{
      label: 'Store progress',
      data: [1, 2, 4, 8, 16, 32, 64, 128, 254, 508, 1016, 2032],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderWidth: 1
    }],
    initialDates: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']
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

    var activePeriod = this.state.activePeriod;
    var yearSelect = this.state.yearSelected;

    if (activePeriod == 'year') {
      console.log("Det var ett år");
      this.onSelectYear(selectedList, selectedItem);
    } else if (activePeriod == 'month') {
      console.log("selectedList :", selectedList)

      if (yearSelect == false) {
        console.log("bara ett år")
        var selectedYear = String(selectedList[0]['month'])
        console.log(selectedYear)

        const months = [
          { 'month': "Jan " + selectedYear, 'id': 1 },
          { 'month': "Feb " + selectedYear, 'id': 2 },
          { 'month': "Mar " + selectedYear, 'id': 3 },
          { 'month': "Apr " + selectedYear, 'id': 4 },
          { 'month': "May " + selectedYear, 'id': 5 },
          { 'month': "Jun " + selectedYear, 'id': 6 },
          { 'month': "Jul " + selectedYear, 'id': 7 },
          { 'month': "Aug " + selectedYear, 'id': 8 },
          { 'month': "Sept " + selectedYear, 'id': 9 },
          { 'month': "Oct " + selectedYear, 'id': 10 },
          { 'month': "Nov " + selectedYear, 'id': 11 },
          { 'month': "Dec " + selectedYear, 'id': 12 }]

        console.log(months)

        this.setState({
          singleSelect: true,
          yearSelected: true,
          selectedYear: selectedYear,
          multiOptions: months
        })
        return;
      } else if (yearSelect == true) {

        var selectedYear = this.state.selectedYear;
        var selectedMonthID = selectedList[0]['id'];
        this.onSelectMonth(selectedYear, selectedMonthID)

        this.setState({
          yearSelected: false
        })
      }

    } else if (activePeriod == "week") {
      console.log("OnSelect: nu är det vecka mina bekanta")
      const weeks = [
        { 'week': "week " + 1, 'id': 1 },
        { 'week': "week " + 2, 'id': 2 },
        { 'week': "week " + 3, 'id': 3 },
        { 'week': "week " + 4, 'id': 4 },
        { 'week': "week " + 5, 'id': 5 },
        { 'week': "week " + 6, 'id': 6 },
        { 'week': "week " + 7, 'id': 7 },
        { 'week': "week " + 8, 'id': 8 },
        { 'week': "week " + 9, 'id': 9 },
        { 'week': "week " + 10, 'id': 10 },
        { 'week': "week " + 11, 'id': 11 },
        { 'week': "week " + 12, 'id': 12 },
        { 'week': "week " + 13, 'id': 13 },
        { 'week': "week " + 14, 'id': 14 },
        { 'week': "week " + 15, 'id': 15 },
        { 'week': "week " + 16, 'id': 16 },
        { 'week': "week " + 17, 'id': 17 },
        { 'week': "week " + 18, 'id': 18 },
        { 'week': "week " + 19, 'id': 19 },
        { 'week': "week " + 20, 'id': 20 },
        { 'week': "week " + 21, 'id': 21 },
        { 'week': "week " + 22, 'id': 22 },
        { 'week': "week " + 23, 'id': 23 },
        { 'week': "week " + 24, 'id': 24 },
        { 'week': "week " + 25, 'id': 25 },
        { 'week': "week " + 26, 'id': 26 },
        { 'week': "week " + 27, 'id': 27 },
        { 'week': "week " + 28, 'id': 28 },
        { 'week': "week " + 29, 'id': 29 },
        { 'week': "week " + 30, 'id': 30 },
        { 'week': "week " + 31, 'id': 31 },
        { 'week': "week " + 32, 'id': 32 },
        { 'week': "week " + 33, 'id': 33 },
        { 'week': "week " + 34, 'id': 34 },
        { 'week': "week " + 35, 'id': 35 },
        { 'week': "week " + 36, 'id': 36 },
        { 'week': "week " + 37, 'id': 37 },
        { 'week': "week " + 38, 'id': 38 },
        { 'week': "week " + 39, 'id': 39 },
        { 'week': "week " + 40, 'id': 40 },
        { 'week': "week " + 41, 'id': 41 },
        { 'week': "week " + 42, 'id': 42 },
        { 'week': "week " + 43, 'id': 43 },
        { 'week': "week " + 44, 'id': 44 },
        { 'week': "week " + 45, 'id': 45 },
        { 'week': "week " + 46, 'id': 46 },
        { 'week': "week " + 47, 'id': 47 },
        { 'week': "week " + 48, 'id': 48 },
        { 'week': "week " + 49, 'id': 49 },
        { 'week': "week " + 50, 'id': 50 },
        { 'week': "week " + 51, 'id': 51 },
        { 'week': "week " + 52, 'id': 52 }]

      if (yearSelect == false) {
        console.log("bara ett år")
        console.log(selectedList)
        var selectedYear = String(selectedList[0]['week'])
        console.log(selectedYear)

        this.setState({
          yearSelected: true,
          selectedYear: selectedYear,
          multiOptions: weeks
        })
        return;
      } else if (yearSelect == true) {
        var selectedYear = this.state.selectedYear
        var selectedWeek = String(selectedItem['id']);

        this.onSelectWeek(selectedYear, selectedWeek);
      }
    }

  }
  onSelectWeek = async (year, week) => {
    console.log("Inne i onselectweek")
    var yearFix = 'y' + String(year);
    var weekList = await getWeeklyDaylyData(yearFix, week, 'totSales', 'Total sales', 0, 1);

    var weekDateList = []
    var salesWeekdayList = []
    for (var i in weekList) {
      // console.log(weekList[i])
      weekDateList.push(weekList[i]['Day'] + "/" + weekList[i]['Month'])
      salesWeekdayList.push(weekList[i]['Total sales'])
    }
    console.log("Date List: ", weekDateList)
    console.log("salesWeekdayList: ", salesWeekdayList);


    var newBar = { label: "Week " + week + " " + year, data: salesWeekdayList, backgroundColor: '#F94144', borderWidth: 1 }
    const weekYears = [
      { 'week': '2018' },
      { 'week': '2019' },
      { 'week': '2020' }]

    if (this.state.dataSets[0].label == 'Store progress') {
      console.log("WEEK: Fanns ingen dataSet från början");
      this.setState({
        dataSets: [newBar],
        dates: weekDateList,
        yearSelected: false,
        multiOptions: weekYears,
        numberOfBars: 1
      })

    } else {
      console.log("WEEK: fanns nått där, nu ska vi göra nått!")
      var oldBar = this.state.dataSets;
      console.log("OldBar ofixad: ", oldBar);
      var updatedBar = [];
      if (this.state.numberOfBars == 1) {
        updatedBar = [oldBar[0], newBar];
      } else {
        updatedBar = oldBar.concat(newBar);
      }
      //---- color generator
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
      //--- Update Week bars
      console.log("Updated WEEK Bar: ", updatedBar)
      var localNumberOfBars = this.state.numberOfBars;

      const weekSimpleDates = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'] //Because the dates will differ from week to week
      this.setState({
        dataSets: updatedBar,
        dates: weekSimpleDates,
        numberOfBars: localNumberOfBars + 1,
        yearSelected: false,
        multiOptions: weekYears
      })
    }


  }

  onSelectMonth = async (selectedYear, selectedMonthID) => {
    console.log("nu kommer vi hit och ska hitta månad!")

    const monthDict = {
      1: ['m1', 'Jan'],
      2: ['m2', 'Feb'],
      3: ['m3', 'Mar'],
      4: ['m4', 'Apr'],
      5: ['m5', 'May'],
      6: ['m6', 'Jun'],
      7: ['m7', 'Jul'],
      8: ['m8', 'Aug'],
      9: ['m9', 'Sept'],
      10: ['m10', 'Oct'],
      11: ['m11', 'Nov'],
      12: ['m12', 'Dec']
    };
    var selectedYear;
    var selectedMonth = monthDict[selectedMonthID][1];
    var monthForFunction = monthDict[selectedMonthID][0]
    console.log("month For function= ", monthForFunction)

    console.log("selected Year: ", selectedYear, "  selectedMonth:  ", selectedMonth);

    var year = Number(selectedYear);
    var yearFix = "y" + year;

    const neededData = await getDaylyData(yearFix, monthForFunction, "totSales", "Total sales", false, 1, 1)

    var totSalesList = [];
    for (var i in neededData) {
      totSalesList.push(neededData[i])
    }

    var monthDates = [];
    var i = 1;
    neededData.forEach(element => {
      monthDates.push(i)
      i = i + 1;
    });
    console.log(monthDates)


    var newBar = { label: selectedMonth + " " + selectedYear, data: neededData, backgroundColor: '#F94144', borderWidth: 1 }
    const monthYear = [
      { 'month': '2018' },
      { 'month': '2019' },
      { 'month': '2020' }
    ]

    if (this.state.dataSets[0].label == 'Store progress') {
      console.log("Fanns ingen dataSet från början");
      this.setState({
        dataSets: [newBar],
        dates: monthDates,
        multiOptions: monthYear,
        singleSelect: true,
        yearSelect: false,
        numberOfBars: 1
      })
    } else {
      //---- Create updated bar of months
      console.log("fanns nått där, nu ska vi göra nått!")
      var oldBar = this.state.dataSets;
      console.log("OldBar ofixad: ", oldBar);
      var updatedBar = [];
      if (this.state.numberOfBars == 1) {
        updatedBar = [oldBar[0], newBar];
      } else {
        updatedBar = oldBar.concat(newBar);
      }
      //---- color generator
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
      // -------------------

      //--- Update month bars
      console.log("Updated MONTH Bar: ", updatedBar)
      var localNumberOfBars = this.state.numberOfBars;
      this.setState({
        dataSets: updatedBar,
        dates: monthDates,
        numberOfBars: localNumberOfBars + 1,
        yearSelected: false,
        multiOptions: monthYear
      })
    }
  }


  onSelectYear = async (selectedList, selectedItem) => {
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
      // create and fix updatedBar
      console.log("!!Fanns nått i dataSet!!");
      var oldBar = this.state.dataSets;
      console.log("OldBar ofixad: ", oldBar);
      var updatedBar = [];
      if (this.state.numberOfBars == 1) {
        updatedBar = [oldBar[0], newBar];
      } else {
        updatedBar = oldBar.concat(newBar);
      }


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
    const initialList = [{
      label: 'Store progress',
      data: [1, 2, 4, 8, 16, 32, 64, 128, 254, 508, 1016, 2032],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderWidth: 1
    }]
    const initialDates = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']

    if (selectedList.length == 0) {
      this.setState({
        dataSets: initialList,
        dates: initialDates
      })
    } else {
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
  }

  buttonClickYear() {
    console.log("Ett year ett year ett year")
    var initial = this.state.initialDataSet;
    var initDates = this.state.initialDates;
    this.setState({
      dataSets: initial,
      dates: initDates,
      singleSelect: false,
      showArrow: true,
      activePeriod: 'year',
      multiOptions: [
        { 'year': "2018", 'group': 'year' },
        { 'year': "2019", 'group': 'year' },
        { 'year': "2020", 'group': 'year' }],
      colorCount: 1,
      yearSelected: false,
    })
  }
  buttonClickMonth() {

    const monthYear = [
      { 'month': '2018' },
      { 'month': '2019' },
      { 'month': '2020' }
    ]
    var initial = this.state.initialDataSet;
    var initDates = this.state.initialDates;
    this.setState({
      dataSets: initial,
      dates: initDates,
      activePeriod: 'month',
      singleSelect: "true",
      multiOptions: monthYear,
      colorCount: 1,
      yearSelected: false,
    })
  }
  buttonClickWeek() {
    console.log("Ett weeeeeeeeeeeeek")
    var initial = this.state.initialDataSet;
    var initDates = this.state.initialDates;
    const weekYear = [
      { 'week': '2018' },
      { 'week': '2019' },
      { 'week': '2020' }]
    this.setState({
      activePeriod: 'week',
      dataSets: initial,
      dates: initDates,
      yearSelected: false,
      multiOptions: weekYear,
      singleSelect: true
    })
  }
  buttonClickClear() {
    console.log("Clear!!")
    var initial = this.state.initialDataSet;
    var initDates = this.state.initialDates;
    this.setState({
      dataSets: initial,
      dates: initDates
    })
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
                          <Button variant="secondary" onClick={this.buttonClickYear.bind(this)}>Year</Button>
                          <Button variant="secondary" onClick={this.buttonClickMonth.bind(this)}>Month</Button>
                          <Button variant="secondary" onClick={this.buttonClickWeek.bind(this)}>Week</Button>
                          <Multiselect
                            options={this.state.multiOptions} // Options to display in the dropdown
                            onSelect={this.onSelect.bind(this)} // Function will trigger on select event
                            onRemove={this.onRemove.bind(this)} // Function will trigger on remove event
                            displayValue={this.state.activePeriod} // Property name to display in the dropdown option
                            placeholder="Select time period"
                            showCheckbox="true"
                            closeOnSelect="false"
                            hidePlaceholder="true"
                            singleSelect={this.state.singleSelect}
                          ></Multiselect>
                          <Button variant="secondary" onClick={this.buttonClickClear.bind(this)}>Clear</Button>
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