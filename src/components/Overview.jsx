import React from "react";
import Chart from 'chart.js';
import Component from 'react';
import ReactDOM from 'react-dom';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import testData from './testdata.json';
import data from '../data.json';
<script src="https://d3js.org/d3.v6.js"></script>



function getData() {
  var salesData = testData["totSales"];
  // console.log(salesData)
  var dateList = [];
  var totSalesList = [];
  for (var i in salesData) {
    dateList.push(salesData[i]["DateOfPurchase"])
    totSalesList.push(salesData[i]["Total sales"])
  }
  totSalesList = totSalesList.map(String);
  console.log("Från funktionen getData:")
  console.log(dateList)
  console.log(totSalesList)

  return {
    dateList, totSalesList
  };
}




class Overview extends React.Component {
  state = {
    dataset: [{
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
    }
    ],
    labels: ['lo', 'tho', 'sdkjf', 'dsf', 'sdf']
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row row1 mw-100">
          <div className="col-6">
            <h1>Bar Chart</h1>
          </div>

          <div className="col-6">
            <h1>Doughnut Chart</h1>
          </div>

        </div>
        {console.log(this.state.dataset)}

        <div className="row">
          <div className="col-6">
            <div>
              <Bar
                data={{
                  labels: this.state.labels,
                  datasets: this.state.dataset
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
                // labels: this.state.data.dateList,
                datasets: [{
                  label: 'Data set #1',
                  data: [10, 22, 4, 4, 5],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    '#F3722C',
                    '#F9C74F'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    '#F3722C',
                    '#F9C74F'
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