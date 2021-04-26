import React from "react";
import { Doughnut } from 'react-chartjs-2';
import './Home.css';
import CountUp from 'react-countup';
import data from "../data";
import { Bar } from 'react-chartjs-2';

var totSalesList = [];

function getDaylyData(year, month, dataType) {
  var salesData = data["prodSales"];
  var listDay = [];
  for (var i in salesData) {
    if (salesData[i]["Year"] == year && salesData[i]["Month"] == month) {
      listDay.push(salesData[i][dataType])
    }
  }
  //console.log("ny test:  ",listDay)
  return listDay
}

function getMonthlyData(year, dataType) {
  var listMonth = [];
  var labelMonth = []
  for (var i = 1; i < 13; i++) {
    var monthTot = sumArr(getDaylyData(year, i, dataType))
    listMonth.push(monthTot)
  }
  //console.log(listMonth)
  return listMonth
}

function getYearlyyData(dataType) {
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
  year = year -yearCount + 1
  for (var i = 0; i < yearCount; i++) {
    var yearTot = sumArr(getMonthlyData(year+i,dataType))
    listYear.push(yearTot)
  }
  console.log(labelYear)
  return {labelYear,listYear}
}



function sumArr(arr) {
  //var arr=Object.values(obj)
  return arr.reduce(function (a, b) {
    return a + b
  }, 0);
}


console.log(getDaylyData(2019, 3, "Sales"))


// var salesData = salesData["totSales"];



// var dateList = [];
// for (var i in salesData) {
//   var date = []
//   date.push(salesData[i]["Year"])
//   date.push(salesData[i]["Month"])
//   date.push(salesData[i]["Day"])
//   dateList.push(date)
//   var listEle = []
//   listEle.push(date)
//   listEle.push(salesData[i]["Total sales"])
//   totSalesList.push(listEle)
// }
// console.log(totSalesList)


// console.log(totSalesList)
// var listMonthSales = []
// var curMonth = [totSalesList[0][0][0], totSalesList[0][0][1]]
// var monthValue = 0;
// for (var i in totSalesList) {

//   if (totSalesList[i][0][1] != curMonth[1]) {
//     listMonthSales.push([curMonth, monthValue])
//     curMonth = [totSalesList[i][0][0], totSalesList[i][0][1]]
//     monthValue = 0
//   }
//   monthValue += totSalesList[i][1]
// }
// listMonthSales.push([curMonth, monthValue])
// console.log(listMonthSales)

// var listYearhSales = []
// var curYear = listMonthSales[0][0][0]
// var yearValue = 0;
// for (var i in listMonthSales) {
//   if (listMonthSales[i][0][0] != curYear) {
//     listYearhSales.push([curYear, yearValue])
//     curYear = listMonthSales[i][0][0]
//     yearValue = 0
//   }
//   yearValue += listMonthSales[i][1]
// }
// listYearhSales.push([curYear, yearValue])
// console.log(listMonthSales)
// var thisYear = 2019;
// var thisMonth = 9
// var lastRev = 0;
// var currRev = 0;
// for (var i in listMonthSales) {
//   if (listMonthSales[i][0][0] == thisYear-1 && listMonthSales[i][0][1] == thisMonth){
//     lastRev = listMonthSales[i][1]
//   }
//   if (listMonthSales[i][0][0] == thisYear && listMonthSales[i][0][1] == thisMonth){
//     currRev = listMonthSales[i][1]
//   }
// }
// console.log(currRev)
// console.log(lastRev)
// var diff = (currRev/lastRev)*100 - 100;
// console.log("omsättningsskilnad: ", diff,"%")

// for (var i in dataArr1) {
//   console.log("inre delen av dataArr1");  //tre stycken arrays med data!


//   var innerArr = dataArr1[i];
//   console.log("varv: " + i);
//   console.log(innerArr);

//   for (var j in innerArr) {
//     const linnerArr = innerArr[j].map((number) =>
//     <li>{number}</li>
// );

//   }
// }

function Home() {

  return (
    <div className="home">
      <div className="container-fluid">
        <div className="row colGrid">
          {/* -------------col one------------ */}
          <div className="col-xs-12 colGrid  col-md-4 bg-warning">
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