import React from "react";
import { Doughnut } from 'react-chartjs-2';
import './Home.css';
import data from "../data";



function getMonthData(year, month, dataType) {

  for (var i in data) {
    if (data[i].Year == year && data[i]) {

    }

  }

}

var totSalesList = [];

var salesData = data[dataType];
var dateList = [];
for (var i in salesData) {
  var date = []
  date.push(salesData[i]["Year"])
  date.push(salesData[i]["Month"])
  date.push(salesData[i]["Day"])
  dateList.push(date)
  var listEle = []
  listEle.push(date)
  listEle.push(salesData[i]["Total sales"])
  totSalesList.push(listEle)
}

var salesData = data["totSales"];
var dateList = [];
for (var i in salesData) {
  var date = []
  date.push(salesData[i]["Year"])
  date.push(salesData[i]["Month"])
  date.push(salesData[i]["Day"])
  dateList.push(date)
  var listEle = []
  listEle.push(date)
  listEle.push(salesData[i]["Total sales"])
  totSalesList.push(listEle)
}


// console.log("från Home: " + totSalesList)
var listMonthSales = []
var curMonth = [totSalesList[0][0][0], totSalesList[0][0][1]]
var monthValue = 0;
for (var i in totSalesList) {

  if (totSalesList[i][0][1] != curMonth[1]) {
    listMonthSales.push([curMonth, monthValue])
    curMonth = [totSalesList[i][0][0], totSalesList[i][0][1]]
    monthValue = 0
  }
  monthValue += totSalesList[i][1]
}
listMonthSales.push([curMonth, monthValue])
console.log("från Home: " + listMonthSales)

var listYearSales = []
var curYear = listMonthSales[0][0][0]
var yearValue = 0;
for (var i in listMonthSales) {
  if (listMonthSales[i][0][0] != curYear) {
    listYearSales.push([curYear, yearValue])
    curYear = listMonthSales[i][0][0]
    yearValue = 0
  }
  yearValue += listMonthSales[i][1]
}
listYearSales.push([curYear, yearValue])
console.log(listYearSales)
var thisYear = 2019;
var thisMonth = 9
var lastRev = 0;
var currRev = 0;
for (var i in listMonthSales) {
  if (listMonthSales[i][0][0] == thisYear - 1 && listMonthSales[i][0][1] == thisMonth) {
    lastRev = listMonthSales[i][1]
  }
  if (listMonthSales[i][0][0] == thisYear && listMonthSales[i][0][1] == thisMonth) {
    currRev = listMonthSales[i][1]
  }
}
// console.log(currRev)
// console.log(lastRev)
var diff = (currRev / lastRev) * 100 - 100;
// console.log("omsättningsskilnad: ", diff, "%")

function Home() {

  return (
    <div className="home">
      <div className="container-fluid">
        <div className="row colGrid">

          {/* -------------col one------------ */}
          <div className="col-xs-12 colGrid  col-md-4 bg-warning">
            <ul>

            </ul>
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