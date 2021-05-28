

var randomNormal = require('random-normal');
var values = inPurchase();
//var values = [[1,2,1],[1,2,2]];

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "usersdb_store5",
  port: 3307
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO in_purchase (PurchaseID, ProductID, Quantity) VALUES ?";

 
con.query(sql, [values], function(err) {
    if (err) throw err;
    console.log("inserted");
    con.end();
});
});


console.log("hola");
var randomNormal = require('random-normal');

function inPurchase() {
  var orders = [

  ];

  // TODO code application logic 
  var SIZE = 1000000;

  var standardDeviation = 0.5;
  var mean = 2.5;
  let num = randomNormal();
  var x = 0;
  var insertArray = [];

  var customer = 0;
  var productID = [];
  for (let index = 1; index < 52; index++) {
    productID.push(index);

  }
  var insert = 0;
  //while(customer<12235){
  while (customer < 20377) {
    if (x == 0) {

      num = randomNormal();
      x = Math.round((num * standardDeviation + mean));
      if (x == 0) {
        x = 1;

      }
      customer += 1;
    
      if (insertArray.length > 0) {
       

        var length = insertArray.length;
      //  console.log(length)
        for (let index = 0; index < length; index++) {
          productID.push(insertArray.pop());
          
        }
       // console.log(productID);
        insertArray.length = 0;

      }

    }
    var index1 = Math.round((Math.random() * (productID.length-1)));


    insert = productID[index1];
    // console.log("insert:"+insert);
    productID=productID.filter(item =>item!=insert);
    insertArray.push(insert);
 //   console.log(insertArray);
  //  console.log(insertArray.length);
    //   console.log(productID.length);




    if (Math.random() < 0.8) {

      orders.push([customer, insert, 1]);
    } else {
      //  console.log("hej");
      orders.push([customer, insert, 2]);
    }



    insert = 0;
    x = x - 1;



  }
  //  writer.write((String)"("+orders[i][0]+","+orders[i][1]+","+orders[i][2]+"),");
  //   for (let index = 0; index < orders.length; index++) {
  //  /console.log(orders[index]);

  // }
  console.log(customer);
  return orders;
}
inPurchase();

//inNormalTest();