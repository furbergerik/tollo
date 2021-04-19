import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './Erik.css';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { csv } from 'd3';
import data from './data.json';
import dataCsv from './data.csv';
<script src="https://d3js.org/d3.v6.js"></script>


// getData();
getData();
function getData() {
  const jsonArr = JSON.parse(data);

  jsonArr.map(item => {
    console.log({ item });
  })

  // var keys = Object.keys(data);
  // console.log(keys);

  // var results = [];
  // for (var i in data) {
  //   console.log('denna: ', data[i]);
  //   results.push([i, data[i]]);
  // }
  // console.log(results);
  // var x = Object.values(data);
  // console.log(x);

  // const arr = [];
  // Object.keys(data).forEach(key => arr.push({ name: key, value: data[key] }));
  // console.log(arr);

}


// const Test = () => {
//   console.log('hej du kom hit');
//   useEffect(() => {
//     csv('data.csv').then(data => {
//       console.log(data);
//     });
//   }, []);
// };


class Erik extends React.Component {
  state = {
  }

  render() {
    // <Test />
    return (
      <div class="container-fluid">
        {/* <div>
          {data.map((dataDetail, index) => {

            console.log(dataDetail);
            return <h1>{dataDetail.shoes}</h1>

          })}
        </div> */}

        <div className="row row1">
          <div className="col-6">
            <h1>Bar Chart</h1>
          </div>

          <div className="col-6">
            <h1 className="myBox">Doughnut Chart</h1>
          </div>

        </div>

        <div class="row row2">
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


export default Erik;