var databaseName = ['usersdb', 'usersdb_store2', 'usersdb_store3', 'usersdb_store4', 'usersdb_store5'];
var filePath = ['./store1.json', './store2.json', './store3.json', './store4.json', './store5.json'];
var mysql = require('mysql');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: './data.csv',
  header: [
    {id: 'Year', title: 'Year'},
    {id: 'Month', title: 'Month'},
    {id: 'Day', title: 'Day'},
    {id: 'Week', title: 'Week'},
    {id: 'Sales', title: 'Sales'},
    {id: 'Dep', title: 'Dep'},
    {id: 'Title', title: 'Title'},



  ]
});
  

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: databaseName[0],
  timezone: "UTC",
  port: 3307
});


var sqlquery={
  bef: "SELECT YEAR(purchase.DateOfPurchase) AS 'Year', MONTH(purchase.DateOfPurchase) AS 'Month',WEEK(purchase.DateOfPurchase,3) AS 'Week', DAY(purchase.DateOfPurchase) AS 'Day',  SUM(in_purchase.Quantity) AS 'Sales',department.DepartmentID AS 'Dep Id',department.Title AS 'Dep Title' FROM purchase INNER JOIN in_purchase INNER JOIN products INNER JOIN department WHERE purchase.PurchaseID = in_purchase.PurchaseID AND in_purchase.ProductID=products.ProductID AND department.DepartmentID=products.DepartmentOf AND department.DepartmentID=",
  aft:"GROUP BY purchase.DateOfPurchase ORDER BY purchase.DateOfPurchase;",
  bef1:`SELECT YEAR(purchase.DateOfPurchase) AS 'Year', MONTH(purchase.DateOfPurchase) AS 'Month',WEEK(purchase.DateOfPurchase,3) AS 'Week', DAY(purchase.DateOfPurchase) AS 'Day',0 AS 'Sales', department.DepartmentID  AS 'Dep Id',department.Title AS 'Dep Title'
  FROM purchase
  INNER JOIN department
  WHERE department.DepartmentID=`,
  aft1:"GROUP BY purchase.DateOfPurchase ORDER BY purchase.DateOfPurchase;",
  totalQuery:`SELECT YEAR(purchase.DateOfPurchase) AS 'Year', MONTH(purchase.DateOfPurchase) AS 'Month',WEEK(purchase.DateOfPurchase,3) AS 'Week', DAY(purchase.DateOfPurchase) AS 'Day', 
  SUM((products.SellingPriceExlTax + products.Tax) * in_purchase.Quantity) AS 'Total sales', 
  SUM((products.SellingPriceExlTax - products.InPrice) * in_purchase.Quantity) AS 'Profit exl. tax', 
  SUM((products.SellingPriceExlTax - products.InPrice) * in_purchase.Quantity)/SUM(products.SellingPriceExlTax*in_purchase.Quantity)*100 AS 'Profit %' 
  FROM purchase 
  INNER JOIN in_purchase 
  INNER JOIN products 
  WHERE purchase.PurchaseID = in_purchase.PurchaseID 
  AND in_purchase.ProductID = products.ProductID 
  GROUP BY purchase.DateOfPurchase 
  ORDER BY purchase.DateOfPurchase;`,
  prodBef:`SELECT YEAR(purchase.DateOfPurchase) AS 'Year', MONTH(purchase.DateOfPurchase) AS 'Month',WEEK(purchase.DateOfPurchase,3) AS 'Week', DAY(purchase.DateOfPurchase) AS 'Day',SUM(in_purchase.Quantity) AS 'Sales', products.ProductID  AS 'prod Id',products.ProductName AS 'Title'
  FROM purchase
  INNER JOIN in_purchase
  INNER JOIN products
  WHERE purchase.PurchaseID = in_purchase.PurchaseID
  AND in_purchase.ProductID=products.ProductID AND products.ProductId=`,
  prodAft:`GROUP BY purchase.DateOfPurchase
  ORDER BY purchase.DateOfPurchase;`,
  prodBef1:`SELECT YEAR(purchase.DateOfPurchase) AS 'Year', MONTH(purchase.DateOfPurchase) AS 'Month',WEEK(purchase.DateOfPurchase,3) AS 'Week', DAY(purchase.DateOfPurchase) AS 'Day',0 AS 'Sales', products.ProductID  AS 'prod Id',products.ProductName AS 'Title'
  FROM purchase
  INNER JOIN products
  WHERE products.ProductId=`,
  prodAft1:`GROUP BY purchase.DateOfPurchase
  ORDER BY purchase.DateOfPurchase;`,
  addSales:`SELECT YEAR(purchase.DateOfPurchase) AS 'Year', MONTH(purchase.DateOfPurchase) AS 'Month', WEEK(purchase.DateOfPurchase,3) AS 'Week', DAY(purchase.DateOfPurchase) AS 'Day',
  SUM(in_purchase.Quantity) as 'Amount sold from dep', department.DepartmentID, department.Title
  FROM purchase
  INNER JOIN in_purchase
  INNER JOIN products
  INNER JOIN department
  WHERE purchase.PurchaseID = in_purchase.PurchaseID
  AND in_purchase.ProductID = products.ProductID
  AND products.DepartmentOf = department.DepartmentID
  GROUP BY purchase.DateOfPurchase, purchase.PurchaseID, department.DepartmentID
  ORDER BY purchase.DateOfPurchase;`


}

var depSales=[];
var totSales=[2018, 2019, 2020];
var prodSales=[];
var addSales;

con.connect(function(err) {

    if (err) throw err;
    console.log("Connected!");
  
    
    
    //var sql = "SELECT YEAR(purchase.DateOfPurchase) AS 'Year', MONTH(purchase.DateOfPurchase) AS 'Month', DAY(purchase.DateOfPurchase) AS 'Day', SUM((products.SellingPriceExlTax + products.Tax) * in_purchase.Quantity) AS 'Total sales' FROM purchase INNER JOIN in_purchase INNER JOIN products WHERE purchase.PurchaseID = in_purchase.PurchaseID AND in_purchase.ProductID = products.ProductID GROUP BY purchase.DateOfPurchase ORDER BY purchase.DateOfPurchase;";
   // var sql=  "SELECT YEAR(purchase.DateOfPurchase) AS 'Year', MONTH(purchase.DateOfPurchase) AS 'Month', DAY(purchase.DateOfPurchase) AS 'Day', SUM(in_purchase.Quantity) AS 'Sales',department.DepartmentID AS 'Dep Id',department.Title AS 'Dep Title' FROM purchase INNER JOIN in_purchase INNER JOIN products INNER JOIN department WHERE purchase.PurchaseID = in_purchase.PurchaseID AND in_purchase.ProductID=products.ProductID AND department.DepartmentID=products.DepartmentOf AND department.DepartmentID=8 GROUP BY purchase.DateOfPurchase ORDER BY purchase.DateOfPurchase";
    var sales;
    var department=8;
    var products=51;
  

  for (let index = 1; index <= department; index++) {

    sql1=sqlquery.bef1+index.toString()+" "+sqlquery.aft1;
    sql=sqlquery.bef+index.toString()+" "+sqlquery.aft;
    con.query(sql1, function(err, result) {
        if (err) throw err;
        //console.log(result);
       // console.log(result);
       // totSales=addDays(result);
        //totSales.push(result);
        //sendData();
        sales=result;
        
    });
    con.query(sql, function(err, result1) {
      if (err) throw err;
      //console.log(result);
     // console.log(result);
      depSales.push(addDays(sales,result1));
      
      //totSales.push(result1);
     
      
  });
 
}


for (let index = 1; index <= products; index++) {
  sql=sqlquery.prodBef+index.toString()+" "+sqlquery.prodAft;
  sql1=sqlquery.prodBef1+index.toString()+" "+sqlquery.prodAft1;
  con.query(sql1, function(err, result) {
      if (err) throw err;
      //console.log(result);
     // console.log(result);
     // totSales=addDays(result);
      //totSales.push(result);
      //sendData();
      sales=result;
      
  });
  con.query(sql, function(err, result1) {
    if (err) throw err;
    //console.log(result);
   // console.log(result);
    prodSales.push(addDays(sales,result1));
    
    //totSales.push(result1);
   
    
});
  
}
con.query(sqlquery.totalQuery, function(err, result) {
  if (err) throw err;
  //console.log(result);
 // console.log(result);
  totSales=result;
  //totSales.push(result1);
 
  
});
con.query(sqlquery.addSales, function(err, result) {
  if (err) throw err;
  //console.log(result);
 // console.log(result);
  addSales=result;
  sendData();
  //totSales.push(result1);
 
  
});
      
  con.end();
  });

function sendData(){
const fs = require('fs');
const fileName = filePath[0];
var file = require(fileName);
  
file.test = "hej";
file.vegard="Vegard";
file.isDepSales="Depsales Sales From That Deparment";
file.isProdSales="prodSales Sales of that product";
file.isAddSales="merförsäljning";
file.isTotSales="vinst / försäljningssiffror";
file.totSales=totSales;
file.depSales=depSales;
file.prodSales=prodSales;
file.addSales=addSales;
csvWriter
  .writeRecords(totSales)
  .then(()=> console.log('The CSV file was written successfully'));

fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
  console.log("skriver inte");
  if (err) return console.log(err);
  console.log('writing to ' + fileName);
});
}

function addDays(total,values){
 // console.log("hej");
  for (let index = 0; index < total.length; index++) {
    for (let i = 0; i < values.length; i++) {
      if(total[index].Year==values[i].Year && total[index].Month==values[i].Month && total[index].Day==values[i].Day ){
        total[index].Sales=values[i].Sales;
        //console.log(values[i].Sales);
        break;
      }
      
    }

    
  }
  return total;
}