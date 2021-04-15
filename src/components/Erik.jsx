import React from "react";
import './Erik.css';
import { Bar } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2'


getData();
async function getData() {
  const response = await fetch('data/data.csv');
  const data = await response.text();
  console.log(data);
}

class Erik extends React.Component {
  state = {
  }

  render() {

    return (
      <div class="container-fluid">
        {/* <div>{getData()}</div> */}
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