import React from "react";
import { Doughnut } from 'react-chartjs-2';
import './Home.css';
import data from "../data"; 

var salesData = data["totSales"];
console.log(salesData)
var dateList = [];
var totSalesList = [];
for(var i in salesData){
dateList.push(salesData[i]["DateOfPurchase"])
totSalesList.push(salesData[i]["Total sales"])
}

console.log(dateList[30])
console.log(totSalesList[30])



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