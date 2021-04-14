
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
                  data: [10, 3, 3, 5, 12, 3],
                  backgroundColor: [
                    'red',
                    'blue',
                    'yellow',
                    'green',
                    'purple',
                    'orange'
                  ]

                }]

              }}


              height={400}
              width={600}
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