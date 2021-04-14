
import React from "react";
import './Erik.css';
import { Bar } from 'react-chartjs-2'

class Erik extends React.Component {
  state = {
  }

  render() {
    return (
      <div class="container-fluid">

        <div class="row">

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

              height={400}
              width={600}

              options={{
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



        </div>



        <div class="row jumbotron" >

          <div class="col-2"> Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Ullam, maiores enim!
          Aliquid numquam exercitationem mollitia
          corrupti accusantium saepe pariatur ratione.</div>

          <div class="col-10"> Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Ullam, maiores enim!
          Aliquid numquam exercitationem mollitia
          corrupti accusantium saepe pariatur ratione.</div>

        </div>

        <div class="row">

          <div class="col-2"> Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Ullam, maiores enim!
          Aliquid numquam exercitationem mollitia
          corrupti accusantium saepe pariatur ratione.</div>

          <div class="col-10"> Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Ullam, maiores enim!
          Aliquid numquam exercitationem mollitia
          corrupti accusantium saepe pariatur ratione.</div>

        </div>



      </div>

    )
  };
}


export default Erik;