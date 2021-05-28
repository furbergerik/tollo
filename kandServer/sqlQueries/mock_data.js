//purchaseID
//DateOFPurchase
//member



var randomNormal = require('random-normal');
var values = order();

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
  var sql = "INSERT INTO purchase (PurchaseID, DateOfPurchase, Member, Review, StoreID) VALUES ?";

 
con.query(sql, [values], function(err) {
    if (err) throw err;
    console.log("inserted");
    con.end();
});
});


function order() {
    var orders = [

    ];
    var SIZE = 1000;
    var year = ['2018','2019','2020'];
    var month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var date = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    var dateLength=0;
    var id=1;
    //'2018-10-20')
for (let ar = 0; ar < year.length; ar++) {
  
    for (let m = 0; m < month.length; m++) {
        if(m==0 || m==2 || m==4 || m==6 || m==7 || m==9 || m==11){
            dateLength=31;
            
        }else if(m==3 || m==5 || m==8 || m==10){
            dateLength=30;
           
        }else{
            dateLength=28;
       
        }
        if(m== 10 || m==11){
            mean=25;
            standardDeviation=4;


        }else if(m==1 || m==2){
            mean=13;
            standardDeviation=3;

        }else if(m==4 ||m==5){
            mean=20;
            standardDeviation=5;

        }else{
            var standardDeviation = 2;
            var mean = 18;

        }
        let num = randomNormal();
        var x = 0;
        for (var i = 0; i < dateLength; i++) {
            if (x == 0) {
                while (x == 0) {
                    num = randomNormal();
                    x = Math.round((num * standardDeviation + mean));
                }
            }

            for (let index = 0; index < x; index++) {

                if (Math.random() < 0.6) {

                    orders.push([id, year[ar] + '-' + month[m] + '-' + date[i], 1,Math.round(Math.random()*5), 5]);
                } else {
                    orders.push([id, year[ar] + '-' + month[m] + '-' + date[i], 0,Math.round(Math.random()*5), 5]);
                }
            id+=1;
        }
        x = 0;


    }
}
}
    //  writer.write((String)'('+orders[i][0]+','+orders[i][1]+','+orders[i][2]+'),');
    //for (let index = 0; index < orders.length; index++) {
  //   console.log(orders[index]);

//   }
console.log(orders.length);
return orders;
};

