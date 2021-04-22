import React from "react";
import ReactDOM from 'react-dom';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import testData from './testdata.json';
<script src="https://d3js.org/d3.v6.js"></script>


getDataLoop();
function getDataLoop() {

  for (var i in testData) {
    var categoryOfData = i;
    console.log("categoryOfData:");
    console.log(testData[categoryOfData]);

    var dataArray = testData[categoryOfData];

    for (var j in dataArray) {
      var dataSet = dataArray[j];
      var date = dataSet['DateOfPurchase'];
      var TotSales = dataSet['Total sales']
      console.log("Datum: " + date);
      console.log("Total Sales: " + TotSales);
    }


  }
}


// getData();
function getData() {
  console.log('tjabbatjena!')
  var dataArr1 = [];
  Object.keys(testData).forEach(function (key) {
    dataArr1.push(testData[key]);
  })
  console.log("dataArr1");
  console.log(dataArr1);

  for (var i in dataArr1) {
    console.log("inre delen av dataArr1");  //tre stycken arrays med data!


    var innerArr = dataArr1[i];
    console.log("varv: " + i);
    console.log(innerArr);

    for (var j in innerArr) {
      console.log(innerArr[j]);
    }
  }



}


class Overview extends React.Component {
  state = {

  }



  render() {
    return (
      <div className="container-fluid">
        {/* <div>{getData()}</div> */}
        <div className="row row1 mw-100">
          <div className="col-6">
            <h1>Bar Chart</h1>
          </div>

          <div className="col-6">
            <h1>Doughnut Chart</h1>
          </div>

        </div>

        <div className="row">
          <div className="col-6">
            <div>
              <Bar
                data={{
                  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                  datasets: [{
                    label: 'Data set #1',
                    data: [10, 10, 19, 5, 12, 3],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                  },
                  {
                    label: 'Data set #2',
                    data: [101.5, 120, 129, 115, 112, 103],
                  }


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

          </div>

          <div className="col-6 position-relative">
            <div className="text-align-center align-self-center bg-primary" >hej</div>
            <Doughnut
              data={{
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [{
                  label: 'Data set #1',
                  data: [15, 20, 7],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                  ],
                  borderWidth: 1
                }],
              }}

              options={{}}
            />
          </div>

        </div>
      </div>
    )
  };
}


export default Overview;