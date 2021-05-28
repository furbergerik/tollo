# Tollo

Foobar is a Python library for dealing with word pluralization.

## Installation

node needs to be installed on your computer. You will need to run npm install.
 Then install the required modules. 

```bash
npm install
```
Then Start with npm start obs server need to be runnig. 

```bash
npm start
```

# Navigation

The code is divided in two main parts. 
The main and then the folder 

```bash
kandServer
```
Kandserver contains our server and data generation files. We wanted to include these because they are a main part of our project but they are included in the repository for you to view. 

The main application are then all other files. 

## Server
In the kandserver folder you will find index.js which is the main server code. 

In the folder kandServer you will also find the folder sqlQueries. 
the file data_inPurchase.js created all the purchases for each store in sql. 

the file mock_data.js created data for the sql. 


Then we have the file mysql_queries that creates the JSON files that we use for our data mart. These JSON files can then be seen in kandserver as store1v2.json and so on. 
  

## Tollo website 
The Tollo website has the most important code in source where you can find app.js and then each part of the code can be found in the components folder. So for code if you want to see the code please check app.js and then the files in components. 


## Last words
Good luck and I hope you find everything. If you have any questions you can reach us at 

olle.kindvall@gmail.com 

## Authors and Acknowledgment:
Authors: 

Erik Furberg, Olle Kindvall, Vegard Pettersson, Hugo Sjönneby

Special thanks to our supervisors: 

Georgios Fakas and Georgios Panayiotou

## License
The Tollo Team