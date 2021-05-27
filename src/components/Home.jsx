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
import { Col, Form, ThemeProvider } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar'
import NumericInput from 'react-numeric-input';
import Cookies from 'universal-cookie';
import { MemoryRouter } from "react-router";
import { Link} from "react-router-dom";
const cookies = new Cookies();



async function getUserSales(username) {
  var username = String(username)
  var token = (cookies.get('jwt')).key;
  var fetchingFrom = `http://tollo.duckdns.org:61338/getMemberProduct?username='${username}'&token=${token}`
  //var fetchingFrom = `http://192.168.0.111:61339/getMemberProduct?username='${username}'&token=${token}`

  const response = await fetch(fetchingFrom);
  const setOfData = await response.json();
  const finalSet = setOfData.data;
  return finalSet;
}
async function updateMemberships(username, count, goal) {
  var username = String(username)
  var token = (cookies.get('jwt')).key;

  var fetchingFrom = `http://tollo.duckdns.org:61338/updateMember?username='${username}'&count=${count}&goal=${goal}&token=${token}`
  //var fetchingFrom = `http://192.168.0.111:61339/updateMember?username='${username}'&count=${count}&goal=${goal}&token=${token}`

  const response = await fetch(fetchingFrom);
  const setOfData = await response.json();
  const finalSet = setOfData.data;
  return finalSet;
}
async function updateProductSales(username, count, goal) {
  var username = String(username)
  var token = (cookies.get('jwt')).key;

  // var fetchingFrom = `http://192.168.0.111:61339/updateProduct?username='${username}'&count=${count}&goal=${goal}&token=${token}`
  var fetchingFrom = `http://tollo.duckdns.org:61338/updateProduct?username='${username}'&count=${count}&goal=${goal}&token=${token}`
  const response = await fetch(fetchingFrom);
  const setOfData = await response.json();
  const finalSet = setOfData.data;
  return finalSet;
}

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
    var token = (cookies.get('jwt')).key;
    var fetchingFrom = 'http://tollo.duckdns.org:61338/store' + storeNr + 'v2/' + dataCategory + '?token=' + token

    //var fetchingFrom = 'http://192.168.0.111:61339/store' + storeNr + 'v2/' + dataCategory + '?token=' + token
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }

  else {
    var token = (cookies.get('jwt')).key;
    var fetchingFrom = 'http://tollo.duckdns.org:61338/store' + storeNr + 'v2/' + dataCategory + '/' + ID + '?token=' + token
    //var fetchingFrom = 'http://192.168.0.111:61339/store' + storeNr + 'v2/' + dataCategory + '/' + ID + '?token=' + token

    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }
}

async function getProductOfTheMonth(month) {
  var token = (cookies.get('jwt')).key;
  var fetchingFrom = `http://tollo.duckdns.org:61338/store1v2/productMonth?month=${month}&token=${token}`

  // var fetchingFrom = `http://192.168.0.111:61339/store1v2/productMonth?month=${month}&token=${token}`
  const response = await fetch(fetchingFrom);
  const setOfData = await response.json();
  const finalSet = setOfData.data;
  return finalSet;
}


async function getWeeklyDaylyData(year, week, dataCategory, dataType, ID, storeNr) {
  const salesData = await getStoreData(dataCategory, ID, storeNr);
  var listDayInWeek = [];
  var yearLevel = salesData[year]
  for (var i in yearLevel) {
    var monthLevel = yearLevel[i]
    for (var i in monthLevel) {
      if (monthLevel[i]['Week'] == week) {
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
  return { labelYear, listYear }
}
async function getProductOfTheMonthName(year, month, storeNr) {
  const monthOfProduct = await getProductOfTheMonth(month)
  const productData = await getStoreData("prodSales", "p" + monthOfProduct, storeNr);
  return productData["y" + year]["m" + month][0]["Title"];
}

async function getToplistProductOfTheMonthData(year, month, dataCategory, dataType, ID, storeNr) {
  const productData = await getStoreData(dataCategory, "p" + ID, storeNr);
  var monthData = productData[year][month];
  var listDay = [];
  for (var i in monthData) {
    listDay.push(monthData[i][dataType]);
  }
  return listDay;
}


async function getTopStoreMonthlyCompData(year, month, dataCategory, dataType) {
  var topList = [];
  var topListStore = [];
  if (year == 2018) {
    for (var i = 1; i < 6; i++) {
      topList.push(0)
      topListStore.push("Store " + i)
    }
  }
  else {
    for (var i = 1; i < 6; i++) {
      var monthTot1 = await getDaylyData("y" + (year - 1), "m" + month, dataCategory, dataType, 0, i)
      var monthTot2 = await getDaylyData("y" + year, "m" + month, dataCategory, dataType, 0, i)
      monthTot1 = sumArr(monthTot1)
      monthTot2 = sumArr(monthTot2)
      var monthTot = (monthTot2 / monthTot1) * 100 - 100;
      //monthTot = monthTot.toFixed(2);
      monthTot = Math.floor(monthTot);
      topList.push(monthTot)
      topListStore.push("Store " + i)
    }
  }
  [topList, topListStore] = bubbleSort(topList, topListStore);
  return [topList, topListStore]
}

async function getTopStoreMonthlyData(year, month, dataCategory, dataType, ID) {
  var topList = [];
  var topListStore = [];
  if (ID == false) {
    for (var i = 1; i < 6; i++) {
      var monthTot = await getDaylyData("y" + year, "m" + month, dataCategory, dataType, ID, i)
      monthTot = sumArr(monthTot)
      topList.push(monthTot)
      topListStore.push("Store " + i)
    }
  }
  else {
    const monthOfProduct = await getProductOfTheMonth(0)
    for (var i = 1; i < 6; i++) {
      var monthTot = await getToplistProductOfTheMonthData("y" + year, "m" + month, dataCategory, dataType, 1, i)
      monthTot = sumArr(monthTot)
      topList.push(monthTot)
      topListStore.push("Store " + i)
    }
  }
  [topList, topListStore] = bubbleSort(topList, topListStore);
  return [topList, topListStore]
}

function bubbleSort(inputArr, inputLabel) {
  var len = inputArr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (inputArr[j] < inputArr[j + 1]) {
        let tmp = inputArr[j];
        let tmpLabel = inputLabel[j]
        inputArr[j] = inputArr[j + 1];
        inputLabel[j] = inputLabel[j + 1]
        inputLabel[j + 1] = tmpLabel;
        inputArr[j + 1] = tmp;
      }
    }
  }
  return [inputArr, inputLabel];
};

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
      initialRender: true,
      disableMultiselect: true,
      currentdate: [{ 'year': 2020, 'month': 12, 'day': 31, 'week': 53 }],
      userInfo: [{
        username: 'b',
        firstName: '',
        lastName: '',
        store: '',
        department: '',
        depID: '',
        profilePath: '',
        productGoal: '',
        membersGoal: '',
      }],
      yourDepMonthSales: 0,
      dataInGraph: false,
      dataSets: [],
      dates: [],
      numberOfBars: 0,
      currentWeekDataSet: [],
      currentWeekDates: [],
      currentMonthDataSet: [],
      currentMonthDates: [],
      currentYearDataSet: [],
      currentYearDates: [],
      multiOptions: [
        { 'year': "2018" },
        { 'year': "2019" },
        { 'year': "2020" }],
      colorCount: 1,
      colorOptions: ['#F94144', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590'],
      activePeriod: 'year',
      year: '2018',
      monthlyCompList: getTopStoreMonthlyData(2018, 3, "totSales", "Total sales", 0),
      bestSellers1: '',
      singleSelect: "false",
      yearSelected: "false",
      selectedYear: '',
      initialDataSet: [{
        label: 'Store progress',
        data: [1, 2, 4, 8, 16, 32, 64, 128, 254, 508, 1016, 2032],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1
      }],
      initialDates: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'],
      monthlyList: [],
      monthlyListStore: [],
      monthlyCompList: [],
      monthlyCompListStore: [],
      yearList: [],
      memberGoalMet: false,
      productGoalMet: false,
      productPercent: 0,
      memberPercent: 0,
      currentProductOfMonthSales: 0,
      currentMemberships: 0,
      totalProducts: 0,
      totalMemberships: 0,
      productMonthly: [],
      productMonthlyStore: [],
      topSellerList: [],
      radioButton: 'POD',
      productMonthlyName: "",
      otherStoreRendered: false,
      storeRevState: [],
      storeRevNameState: [],
      storeRevCompState: [],
      storeRevCompNameState: [],
      storeProdOfMoState: [],
      storeProdOfMoNameStete: [],
    }
  };

  // ---------------From DropDown---------------------
  handleYearSelect = async (e) => {

    const year = "y" + Number(e)
    const [neededData, dates] = await getMonthlyData(year, "totSales", "Total sales", false, 0, 1) //0 = totSales, 1 = store1
    // let dateList = Object.keys(neededData);
    var totSalesList = [];
    for (var i in neededData) {
      totSalesList.push(neededData[i])
    }

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

  test = async () => {
    return this.state.monthlyCompList[0]
  }

  // ---------------From MultiSelect---------------------
  onSelect = async (selectedList, selectedItem) => {
    console.log("In onSelect");

    var activePeriod = this.state.activePeriod;
    var yearSelect = this.state.yearSelected;

    if (activePeriod == 'year') {
      this.onSelectYear(selectedList, selectedItem);
    } else if (activePeriod == 'month') {
      if (yearSelect == false) {
        var selectedYear = String(selectedList[0]['month'])

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
        { 'week': "week " + 52, 'id': 52 },
        { 'week': "week " + 53, 'id': 53 }]

      if (yearSelect == false) {
        var selectedYear = String(selectedList[0]['week'])

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
    var weekList = await getWeeklyDaylyData(yearFix, week, 'totSales', 'Total sales', 0, this.state.userInfo.store);

    var weekDateList = []
    var salesWeekdayList = []
    for (var i in weekList) {
      weekDateList.push(weekList[i]['Day'] + "/" + weekList[i]['Month'])
      salesWeekdayList.push(weekList[i]['Total sales'])
    }

    var newBar = { label: "Week " + week + " " + year, data: salesWeekdayList, backgroundColor: '#F94144', borderWidth: 1 }
    const weekYears = [
      { 'week': '2018' },
      { 'week': '2019' },
      { 'week': '2020' }]

    // for(var year in this.state.yearList){
    //   weekYears.push
    // }

    if (this.state.initialRender == true) {
      newBar.label = 'This week: ' + week
      this.setState({
        currentWeekDataSet: [newBar],
        currentWeekDates: weekDateList,
        dataSets: [newBar],
        dates: weekDateList,
      })
    }

    if (this.state.dataInGraph == false) {
      console.log("WEEK: Fanns ingen dataSet från början");
      this.setState({
        dataSets: [newBar],
        dates: weekDateList,
        yearSelected: false,
        multiOptions: weekYears,
        numberOfBars: 1,
        dataInGraph: true
      })

    } else {
      console.log("WEEK: fanns nått där, nu ska vi göra nått!")
      var oldBar = this.state.dataSets;
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

    var year = Number(selectedYear);
    var yearFix = "y" + year;

    const neededData = await getDaylyData(yearFix, monthForFunction, "totSales", "Total sales", 0, this.state.userInfo.store)
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

    var newBar = { label: selectedMonth + " " + selectedYear, data: neededData, backgroundColor: '#F94144', borderWidth: 1 }
    const monthYear = [
      { 'month': '2018' },
      { 'month': '2019' },
      { 'month': '2020' }
    ]


    if (this.state.initialRender == true) {
      newBar.label = 'This month: ' + selectedMonth
      this.setState({
        currentMonthDataSet: [newBar],
        currentMonthDates: monthDates,
        dataInGraph: false
      })
      return
    }

    if (this.state.dataInGraph == false) {
      console.log("Fanns inget dataSet från början");
      this.setState({
        dataSets: [newBar],
        dates: monthDates,
        multiOptions: monthYear,
        singleSelect: true,
        yearSelect: false,
        numberOfBars: 1,
        dataInGraph: true
      })
    } else {
      //---- Create updated bar of months
      var oldBar = this.state.dataSets;
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

    if (this.state.initialRender == true) {
      var year = selectedItem
      var yearFix = 'y' + year;
    } else {
      var year = Number(selectedItem.year);
      var yearFix = "y" + year;
    }

    const [neededData, dates] = await getMonthlyData(yearFix, "totSales", "Total sales", false, 0, this.state.userInfo.store)

    var totSalesList = [];
    for (var i in neededData) {
      totSalesList.push(neededData[i])
    }
    var newBar = { label: year, data: neededData, backgroundColor: '#F94144', borderWidth: 1 }

    if (this.state.initialRender == true) {
      newBar.label = 'This year: ' + year
      this.setState({
        currentYearDataSet: [newBar],
        currentYearDates: dates,
        dataInGraph: false
      })
      return
    }

    if (this.state.dataInGraph == false) {
      console.log("Fanns ingen dataSet från början");
      this.setState({
        dataSets: [newBar],
        dates: dates,
        numberOfBars: 1,
        dataInGraph: true
      },
        () => {
          console.log("STATE  ", this.state.dataSets)
        })
    } else {
      // create and fix updatedBar
      console.log("!!Fanns nått i dataSet!!");
      var oldBar = this.state.dataSets;
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

      this.setState({
        dataSets: updatedList
      })
    }
  }

  buttonClickYear() {
    console.log("Button Click Year")
    var initial = this.state.currentYearDataSet;
    var initDates = this.state.currentYearDates;

    var yearList = []
    var currentYears = this.state.yearList
    for (var i = 0; i < currentYears.length; i++) {
      yearList.push({ 'year': String(currentYears[i]) })
    }

    this.setState({
      dataSets: initial,
      dates: initDates,
      singleSelect: true,
      showArrow: true,
      activePeriod: 'year',
      multiOptions: yearList,
      colorCount: 1,
      yearSelected: false,
      dataInGraph: false,
      disableMultiselect: false
    })
  }
  buttonClickMonth() {

    var yearList = []
    var currentYears = this.state.yearList
    for (var i = 0; i < currentYears.length; i++) {
      yearList.push({ 'month': String(currentYears[i]) })
    }

    var initial = this.state.currentMonthDataSet;
    var initDates = this.state.currentMonthDates;
    this.setState({
      dataSets: initial,
      dates: initDates,
      activePeriod: 'month',
      singleSelect: true,
      multiOptions: yearList,
      colorCount: 1,
      yearSelected: false,
      dataInGraph: false,
      disableMultiselect: false
    })
  }
  buttonClickWeek() {
    console.log("Button Click Week")
    var initial = this.state.currentWeekDataSet;
    var initDates = this.state.currentWeekDates;

    var yearList = []
    var currentYears = this.state.yearList
    for (var i = 0; i < currentYears.length; i++) {
      yearList.push({ 'week': String(currentYears[i]) })
    }


    this.setState({
      activePeriod: 'week',
      dataSets: initial,
      dates: initDates,
      yearSelected: false,
      multiOptions: yearList,
      singleSelect: true,
      dataInGraph: false,
      disableMultiselect: false
    })
  }
  buttonClickClear() {
    console.log("Button Click Clear")
    var initial = this.state.initialDataSet;
    var initDates = this.state.initialDates;
    this.setState({
      dataSets: initial,
      dates: initDates,
      dataInGraph: false,
    })
  }

  submitButton = async () => {
    console.log("Submit")

    var username = this.state.userInfo.username

    var userSales = await getUserSales(username)

    var members = userSales['members']
    var products = userSales['productSold']

    var newProducts = this.state.currentProductOfMonthSales
    var newMemberships = this.state.currentMemberships

    var totalMemberships = members + newMemberships
    var totalProducts = products + newProducts
    if (totalMemberships < 0) {
      totalMemberships = 0
    }
    if (totalProducts < 0) {
      totalProducts = 0
    }

    var membershipGoal = this.state.userInfo.membersGoal
    var productGoal = this.state.userInfo.productGoal

    var memberPercent = (totalMemberships / membershipGoal) * 100
    var productPercent = (totalProducts / productGoal) * 100



    await updateMemberships(username, totalMemberships, 0)
    await updateProductSales(username, totalProducts, 0)



    this.setState({
      totalProducts: totalProducts,
      totalMemberships: totalMemberships,
      currentMemberships: 0,
      currentProductOfMonthSales: 0,
      memberPercent: memberPercent,
      productPercent: productPercent
    })
    if (totalMemberships >= membershipGoal) {
      this.setState({
        memberGoalMet: true
      })
    } else if (totalMemberships < membershipGoal) {
      this.setState({
        memberGoalMet: false
      })
    }
    if (totalProducts >= productGoal) {
      this.setState({
        productGoalMet: true
      })
    } else if (totalProducts < productGoal) {
      this.setState({
        productGoalMet: false
      })
    }
    this.myStoreTopSellers()
  }
  pOfMonth(valueAsNumber, valueAsString, input) {
    console.log("product sold!")
    this.setState({
      currentProductOfMonthSales: valueAsNumber
    })
  }
  memberships(valueAsNumber, valueAsString, input) {
    console.log("membership signed!")
    this.setState({
      currentMemberships: valueAsNumber
    })
  }
  initUserSales = async () => {
    var username = this.state.userInfo.username
    if (username != undefined) {
      var userSales = await getUserSales(username)
      var totalMemberships = userSales['members']
      var totalProducts = userSales['productSold']

      var membershipGoal = this.state.userInfo.membersGoal
      var productGoal = this.state.userInfo.productGoal

      var memberPercent = (totalMemberships / membershipGoal) * 100
      var productPercent = (totalProducts / productGoal) * 100
      if (totalMemberships >= membershipGoal) {
        this.setState({
          memberGoalMet: true
        })
      }
      if (totalProducts >= productGoal) {
        this.setState({
          productGoalMet: true
        })
      }

      this.setState({
        totalMemberships: totalMemberships,
        totalProducts: totalProducts,
        memberPercent: memberPercent,
        productPercent: productPercent,
      })
    } else {
      console.log("----undvek katastrof!-------")
    }
  }

  getYears = async () => {
    var token = (cookies.get('jwt')).key;
    var yearFetch = `http://tollo.duckdns.org:61338/getYear?token=${token}`

    // var yearFetch = `http://192.168.0.111:61339/getYear?token=${token}`
    const yearResponse = await fetch(yearFetch);
    const yearSetOfData = await yearResponse.json();
    const yearSet = yearSetOfData.data;
    this.setState({
      yearList: yearSet
    })
  }
  getCurrentDate = async () => {
    var token = (cookies.get('jwt')).key;

    var dateFetch = `http://tollo.duckdns.org:61338/getDate?token=${token}`
    // var dateFetch = `http://192.168.0.111:61339/getDate?token=${token}`
    const dateResponse = await fetch(dateFetch);
    const dateSetOfData = await dateResponse.json();
    const dateSet = dateSetOfData.data;

    var dateList = []
    dateList.push({ 'year': dateSet[0], 'month': dateSet[1], 'day': dateSet[2], 'week': dateSet[3] })

    this.setState({
      currentDate: dateList
    })
  }
  getUserInfo = async () => {
    var x = (cookies.get('username')).key;
    var token = (cookies.get('jwt')).key;
    var fetchingFrom = `http://tollo.duckdns.org:61338/getUsers?username=${x}&token=${token}`;
    //var fetchingFrom = `http://192.168.0.111:61339/getUsers?username=${x}&token=${token}`;

    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;

    var department = finalSet[0].department
    var departmentFix = department.replace('_', ' ')

    var userInfoArray = {
      username: finalSet[0].username,
      firstName: finalSet[0].first_name,
      lastName: finalSet[0].last_name,
      department: departmentFix,
      depID: finalSet[0].depId,
      store: finalSet[0].store,
      profilePath: finalSet[0].profilePath,
      productGoal: finalSet[0].productGoal,
      membersGoal: finalSet[0].membersGoal
    }

    this.setState({
      userInfo: userInfoArray
    })
  }

  bestSellers = async (store, MemberOrProduct) => {
    var token = (cookies.get('jwt')).key;

    //var fetchingFrom = `http://192.168.0.111:61339/bestSellers?store=${store}&membOrProd='${MemberOrProduct}'&token=${token}`
    var fetchingFrom = `http://tollo.duckdns.org:61338/bestSellers?store=${store}&membOrProd='${MemberOrProduct}'&token=${token}`
    const response = await fetch(fetchingFrom);
    const setOfData = await response.json();
    const finalSet = setOfData.data;
    return finalSet;
  }
  myStoreTopSellers = async () => {

    var userStore = this.state.userInfo.store
    if (userStore == undefined) {
      userStore = 0
    }

    const membersSellers = await this.bestSellers(userStore, 'members')
    const productsSellers = await this.bestSellers(userStore, 'products')

    var topFiveMembersSellers = []
    var topFiveProductsSellers = []

    for (var i = 0; i < 5; i++) {
      if (membersSellers[i] !== undefined) {
        topFiveMembersSellers.push(membersSellers[i])
      }
    }
    for (var i = 0; i < 5; i++) {
      if (productsSellers[i] !== undefined) {
        topFiveProductsSellers.push(productsSellers[i])
      }
    }

    var productSellers = []
    var productsSold = []
    for (var object in topFiveProductsSellers) {
      if (topFiveProductsSellers[object] !== undefined) {
        console.log("indentified seller boi")
        productSellers.push(topFiveProductsSellers[object].first_name + ' ' + topFiveProductsSellers[object].last_name)
        productsSold.push(topFiveProductsSellers[object].productSold)
      } else {
        console.log("undefined seller boi")
      }
    }

    var [orderedProducts, orderedSellers] = bubbleSort(productsSold, productSellers)

    topFiveProductsSellers = []
    for (var i = 0; i < 5; i++) {
      if (orderedSellers[i] !== undefined) {
        topFiveProductsSellers.push({ 'name': orderedSellers[i], 'productsSold': orderedProducts[i] })
      }
    }

    this.createTopFiveSellerList(topFiveMembersSellers, topFiveProductsSellers)
  }
  createTopFiveSellerList(topFiveMembersSellers, topFiveProductsSellers) {


    console.log(this.state.radioButton, " I createtopfive")

    if (this.state.radioButton == 'Members') {
      console.log("Nu ska toplist members visas!")

      var topList = []
      for (var seller in topFiveMembersSellers) {
        if (topFiveMembersSellers[seller] != undefined) {
          topList.push(<div key={seller} className="topSeller">
            {topFiveMembersSellers[seller].members}{"  "}{topFiveMembersSellers[seller].first_name}{" "}{topFiveMembersSellers[seller].last_name}
          </div>)
        }
      }

    } else if (this.state.radioButton == 'POD') {
      console.log("Nu ska POD visas!")

      var topList = []
      for (var seller in topFiveProductsSellers) {
        if (topFiveProductsSellers[seller] != undefined) {
          topList.push(<div key={seller + "a"} className="topSeller">
            {topFiveProductsSellers[seller].productsSold}{"  "}{topFiveProductsSellers[seller].name}
          </div>)
        }
      }
    }

    console.log("Toplist över vald kategori: ", topList, " ", this.state.radioButton)

    this.setState({
      topSellerList: topList,
    })

  }
  onChangeValue(event) {
    console.log(event.target.value, 'radio button')

    var memOrPod = String(event.target.value)

    console.log(memOrPod)
    this.setState({
      radioButton: memOrPod,
    })
    this.myStoreTopSellers()
  }

  setInitDataSet = async () => {
    this.setState({
      yearSelected: true
    })

    if (this.state.currentDate == undefined) {
      await this.onSelectWeek(2020, 53)
      await this.onSelectMonth(2020, 12)
      await this.onSelectYear([], 2020)
    }
    await this.onSelectWeek(this.state.currentDate[0].year, this.state.currentDate[0].week)
    await this.onSelectMonth(this.state.currentDate[0].year, this.state.currentDate[0].month)
    await this.onSelectYear([], this.state.currentDate[0].year)
  }
  createOtherStoreData() {
    const storeRev = [];
    const storeRevName = [];
    var keys = Math.floor(Math.random() * 1000000);
    for (const [index, value] of this.state.monthlyList.entries()) {
      storeRev.push(<div className="top1-score" key={keys + index} style={{ gridRow: index + 2 }}><CountUp className="kong" separator=" " duration={5} suffix=" SEK" end={value} /></div>)
    }
    for (const [index, value] of this.state.monthlyListStore.entries()) {
      var keys = Math.floor(Math.random() * 100000);
      storeRevName.push(<div style={{ gridRow: index + 2 }} key={keys * 2 + index} className="top1">{value}</div>)
    }
    const storeRevComp = [];
    const storeRevCompName = [];
    for (const [index, value] of this.state.monthlyCompList.entries()) {
      storeRevComp.push(<div key={keys * 3 + index} className="top1-score" style={{ gridRow: index + 2 }}><CountUp className="kong" duration={5} suffix=" %" end={value} /></div>)
    }
    for (const [index, value] of this.state.monthlyCompListStore.entries()) {
      storeRevCompName.push(<div key={keys * 4 + index} style={{ gridRow: index + 2 }} className="top1">{value}</div>)
    }

    const storeProdOfMo = [];
    const storeProdOfMoName = [];
    for (const [index, value] of this.state.productMonthly.entries()) {
      storeProdOfMo.push(<div className="top1-score" key={keys * 5 + index} style={{ gridRow: index + 2 }}><CountUp className="kong" duration={5} suffix=" products" end={value} /></div>)
    }
    for (const [index, value] of this.state.productMonthlyStore.entries()) {
      storeProdOfMoName.push(<div style={{ gridRow: index + 2 }} key={keys * 6 + index} className="top1">{value}</div>)
    }
    this.setState({
      storeRevState: storeRev,
      storeRevNameState: storeRevName,
      storeRevCompState: storeRevComp,
      storeRevCompNameState: storeRevCompName,
      storeProdOfMoState: storeProdOfMo,
      storeProdOfMoNameState: storeProdOfMoName,
    })

  }


  componentDidMount = async () => {

    if (this.state.initialRender == true) {
      await this.getUserInfo()
      await this.initUserSales()
      await this.getYears()
      await this.getCurrentDate()
      await this.myStoreTopSellers()
      await this.setInitDataSet()


      const yearList = this.state.yearList

      const [theTopList1, theTopListStore1] = await getTopStoreMonthlyData(yearList[yearList.length - 1], 12, "totSales", "Total sales", 0);
      const [theTopList2, theTopListStore2] = await getTopStoreMonthlyCompData(yearList[yearList.length - 1], 12, "totSales", "Total sales");
      const [theTopList3, theTopListStore3] = await getTopStoreMonthlyData(yearList[yearList.length - 1], 12, "prodSales", "Sales", 6);

      const prodMon = await getProductOfTheMonthName(yearList[yearList.length - 1], 12, 1)
      this.setState({
        monthlyList: theTopList1,
        monthlyListStore: theTopListStore1,
        monthlyCompList: theTopList2,
        monthlyCompListStore: theTopListStore2,
        productMonthly: theTopList3,
        productMonthlyStore: theTopListStore3,
        productMonthlyName: prodMon
      });
      this.createOtherStoreData();
      const depMonthSales = await getMonthlyData("y" + this.state.yearList[this.state.yearList.length - 1], 'depSales', 'Sales', false, "d" + this.state.userInfo.depID, this.state.userInfo.store)
      var currentMonthDepSales = depMonthSales[0][this.state.currentDate[0].month - 1]

      this.setState({
        yourDepMonthSales: currentMonthDepSales
      })

      this.setState({
        initialRender: false //Ändras till false så kör bara en gång
      })
    }
  }


  render() {
    return (
      <div className="home">
        <div className="container-fluid-lg h-100 px-3">
          <div className="row h-lg-100 colGrid">
            {/* -------------col one------------ */}
            <div className=" colGrid col1 col-md-12 col-lg-4 px-0" >
              <div className="dep-container individual">
                <div className="progress-window userBox">
                <Link className="navbar-brand" to="/MyProfile">
                <div  onClick="href='MyProfile';" className="col-md-4" className="profile-pic" style={{ backgroundImage: `url(${this.state.userInfo.profilePath})` }}>
         
                </div>         
                 </Link>
                 

              
                  <h4>Welcome back {this.state.userInfo.firstName}!</h4>
                </div>
                <div className={`progress-window goals${this.state.memberGoalMet ? ' goalMet' : ''}`}>
                  <div >Membership Goal: {this.state.userInfo.membersGoal}</div>
                  <ProgressBar className={`progress${this.state.memberGoalMet ? ' goalMet' : ''}`} variant="success" animated now={this.state.memberPercent} label={this.state.totalMemberships} />
                  Product of the Month Goal: {this.state.userInfo.productGoal}
                  <ProgressBar className={`progress${this.state.productGoalMet ? ' goalMet' : ''}`} variant="info" animated now={this.state.productPercent} label={this.state.totalProducts} />
                </div>
                <div className="progress-window logg">
                  New members:
                <NumericInput className="form-control" onChange={this.memberships.bind(this)} value={this.state.currentMemberships} />
                  Product of the Month:
                <NumericInput className="form-control" onChange={this.pOfMonth.bind(this)} value={this.state.currentProductOfMonthSales} />
                  <button className="submit-button" onClick={this.submitButton}>Submit</button>
                </div>
              </div>
            </div>

            {/* -------------col two------------ */}
            <div className=" col-md-12 col-lg-8 px-0">
              {/* own store */}

              <div className="row  h-50  col2 fix-mrgn2">

                <div className="dep-container own-store">
                  <div className="row h-100">
                    <div className="col-md-12  hidden-xs-down col-lg-7 fix-mrgn">
                      <div className="store-window window-1">
                        <div className="myStoreTitleGrid">
                          <p className="myStoreTitle">Store {this.state.userInfo.store}</p>
                        </div>

                        <div className="myStore">
                          <Bar
                            data={{
                              labels: this.state.dates,
                              datasets: this.state.dataSets
                            }}

                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
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
                              showArrow="false"
                              disable={this.state.disableMultiselect}
                            ></Multiselect>
                            <Button variant="secondary" onClick={this.buttonClickClear.bind(this)}>Clear</Button>
                          </ButtonGroup>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 col-lg-5 fix-mrgn">
                      <div className="store-window window-2">

                        <div className="storeDetails">
                          <div className="myStoreTitle">This Month:</div>
                          <div className="monthInfo">
                            <div>Your department:</div>
                            <div className="textRight">
                              <div>{this.state.userInfo.department}:</div>
                              <div>
                                <CountUp
                                  start={0}
                                  end={this.state.yourDepMonthSales}
                                  duration={2.75}
                                  separator=" "
                                  decimals={0}
                                  decimal=","
                                  suffix=" # of sales"
                                >
                                </CountUp>
                              </div>

                            </div>
                            <div className="borderTop">Product of the Month:</div>
                            <div className="productOfMonth textRight borderTop">{this.state.productMonthlyName}</div>
                          </div>
                        </div>
                        <div className="topSellerGrid">
                          <p className="myStoreTitle topSellers">Top sellers:</p>
                          <div className="radioButtons" onChange={this.onChangeValue.bind(this)}>
                            <input type="radio" value="POD" name="gender" defaultChecked /> PotM{"   "}
                            <input type="radio" value="Members" name="gender" /> Members
                          </div>
                        </div>

                        <div className="scrollTopList">
                          {this.state.topSellerList}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              {/* -------OTHER STORES------ */}
              <div className="row h-50 col2 fix-mrgn2">
                <div className="dep-container other-store">
                  <div className="row h-100">
                    <div className="col-lg-4 fix-mrgn">
                      <div className="store-window window-3">
                        <div className="headline">Top Selling Store: This Month</div>
                        {this.state.storeRevNameState}
                        {this.state.storeRevState}
                      </div>
                    </div>
                    <div className="col-lg-4 fix-mrgn">
                      <div className="store-window window-4">
                        <div className="headline">Most Improved Store: This Month</div>
                        {this.state.storeRevCompState}
                        {this.state.storeRevCompNameState}
                      </div>
                    </div>
                    <div className="col-lg-4 fix-mrgn">
                      <div className="store-window window-5">
                        <div className="headline">Product Of The Month: {this.state.productMonthlyName}</div>
                        {this.state.storeProdOfMoState}
                        {this.state.storeProdOfMoNameState}
                      </div>
                    </div>
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