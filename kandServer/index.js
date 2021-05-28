const express = require('express');
require('dotenv').config()
const cors =require('cors');
const mysql = require('mysql');
const app =express();
var fs = require('fs'),
request = require('request');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//app.use(bodyParser.json());
//app.use(cookieParser);
var testToken;


app.use('/public',express.static(__dirname+'/images'),cookieParser);
var store1 = require('./store1.json');
var store2 = require('./store2.json');
var store3 = require('./store3.json');
var store4 = require('./store4.json');
var store5 = require('./store5.json');
var store1v2 = require('./store1v2.json');
var store2v2 = require('./store2v2.json');
var store3v2 = require('./store3v2.json');
var store4v2 = require('./store4v2.json');
var store5v2 = require('./store5v2.json');

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM user';



const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "users",
  });

  connection.connect(err => {
    if(err){
        return err;
    }else{
        console.log("connected");

    }


  });

app.use(cors());
app.get('/getYear',(req,res)=>{
   token=req.query.token;
    if(verify(token)){
    console.log(store1.vegard);
  //  console.log(data);
    //console.log(store1.totSales);
        return res.json({
           
         
         
            //data:(store1v2.Years,2020,12,31),
            data:(store1v2.Years),
            

        })
   }

    

});
app.get('/getDate',(req,res)=>{
    token=req.query.token;
     if(verify(token)){
     console.log(store1.vegard);
   //  console.log(data);
     //console.log(store1.totSales);
         return res.json({
            
          
          
             //data:(store1v2.Years,2020,12,31),
             data:([2020,12,31,53])
             
 
         })
    }
 
     
 
 });
app.get('/store1v2/department',(req,res)=>{
    const {department,token}=req.query;

    if(verify(token)){
    console.log(store1.vegard);
    if(department===0){
        return res.json({
            data:store1v2.Departments.length
        })

    }else{
        console.log(store1v2.Departments[department-1])
        return res.json({
            data:store1v2.Departments[department-1]
        })

    }
}
});

app.get('/select',(req,res)=>{
    connection.query(SELECT_ALL_USERS_QUERY,(err,results) => {
        console.log("hola");
        if(err){
            return res.send(err)


        }else{
            return res.json({
                data:"results"                         

            })

        }


    });

});
app.get('/test',(req,res)=>{
    console.log(store1.vegard);
  //  console.log(data);
    //console.log(store1.totSales);
        return res.json({
           
         
            data:store1.totSales,
            

        })

    

});
app.get('/store1/totSales',(req,res)=>{
    console.log(store1.vegard);
        return res.json({
         
            data:store1.totSales

        })

    

});
app.get('/store1/addSales',(req,res)=>{
    console.log(store1.vegard);
        return res.json({
         
            data:store1.addSales

        })

    

});
app.get('/store1/prodSales',(req,res)=>{
    console.log(store1.vegard);
        return res.json({
         
            data:store1.prodSales

        })

    

});
app.get('/store1/depSales',(req,res)=>{
    console.log(store1.vegard);
        return res.json({
         
            data:store1.depSales

        })

    

});
app.get('/store2/totSales',(req,res)=>{
    console.log(store2.vegard);
        return res.json({
         
            data:store2.totSales

        })

    

});
app.get('/store2/addSales',(req,res)=>{
    console.log(store2.vegard);
        return res.json({
         
            data:store2.addSales

        })

    

});
app.get('/store2/prodSales',(req,res)=>{
    console.log(store2.vegard);
        return res.json({
         
            data:store2.prodSales

        })

    

});
app.get('/store2/depSales',(req,res)=>{
    console.log(store2.vegard);
        return res.json({
         
            data:store2.depSales

        })

    

});
app.get('/store3/totSales',(req,res)=>{
    console.log(store3.vegard);
        return res.json({
         
            data:store3.totSales

        })

    

});
app.get('/store3/addSales',(req,res)=>{
    console.log(store3.vegard);
        return res.json({
         
            data:store3.addSales

        })

    

            });
            app.get('/store3/prodSales',(req,res)=>{
    console.log(store3.vegard);
        return res.json({
         
            data:store3.prodSales

        })

    

});
app.get('/store3/depSales',(req,res)=>{
    console.log(store3.vegard);
        return res.json({
         
            data:store3.depSales

        })

    

});
app.get('/store4/totSales',(req,res)=>{
    console.log(store4.vegard);
        return res.json({
         
            data:store4.totSales

        })

    

});
app.get('/store4/addSales',(req,res)=>{
    console.log(store4.vegard);
        return res.json({
         
            data:store4.addSales

        })

    

});
app.get('/store4/prodSales',(req,res)=>{
    console.log(store4.vegard);
        return res.json({
         
            data:store4.prodSales

        })

    

});
app.get('/store4/depSales',(req,res)=>{
    console.log(store4.vegard);
        return res.json({
         
            data:store4.depSales

        })

    

});
app.get('/store5/totSales',(req,res)=>{
    console.log(store5.vegard);
        return res.json({
         
            data:store5.totSales

        })

    

});
app.get('/store5/addSales',(req,res)=>{
    console.log(store5.vegard);
        return res.json({
         
            data:store5.addSales

        })

    

});
app.get('/store5/prodSales',(req,res)=>{
    console.log(store5.vegard);
        return res.json({
         
            data:store5.prodSales

        })

    

});
app.get('/store5/depSales',(req,res)=>{
    console.log(store5.vegard);
        return res.json({
         
            data:store5.depSales

        })

    

});
app.get('/store1v2/productMonth',(req,res)=>{
    console.log("productMonth");
    month=req.query.month;
    console.log(month);
    console.log("store1v2.productMonth");
    console.log(store1v2.productMonth[0]);
    if(verify(token)){
    if(month==0){
        return res.json({
            
            data:store1v2.productMonth
        })
 
    }else{
        return res.json({
            data:store1v2.productMonth[month-1]
        })

    }
    }
});
app.get('/store1v2/totSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
         
            data:store1v2.totSales

        })
    }
    

});
app.get('/store1v2/addSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
         
            data:store1v2.addSales

        })
    }
    

});
app.get('/store1v2/prodSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales
        })
    }
});

app.get('/store1v2/prodSales/p1',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p1
        })
    }
});

app.get('/store1v2/prodSales/p2',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p2
        })
    }
        
});

app.get('/store1v2/prodSales/p3',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p3
        })
    }
});

app.get('/store1v2/prodSales/p4',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p4
        })
    }
});

app.get('/store1v2/prodSales/p5',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p5
        })
    }
});

app.get('/store1v2/prodSales/p6',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p6
        })
    }
});

app.get('/store1v2/prodSales/p7',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p7
        })
    }
});

app.get('/store1v2/prodSales/p8',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p8
        })
    }
});

app.get('/store1v2/prodSales/p9',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p9
        })
    }
});

app.get('/store1v2/prodSales/p10',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p10
        })
    }
});

app.get('/store1v2/prodSales/p11',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p11
        })
    }
});

app.get('/store1v2/prodSales/p12',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p12
        })
    }
});

app.get('/store1v2/prodSales/p13',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p13
        })
    }
});

app.get('/store1v2/prodSales/p14',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p14
        })
    }
});

app.get('/store1v2/prodSales/p15',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p15
        })
    }
});

app.get('/store1v2/prodSales/p16',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p16
        })
    }
});

app.get('/store1v2/prodSales/p17',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p17
        })
    }
});

app.get('/store1v2/prodSales/p18',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p18
        })
    }
});

app.get('/store1v2/prodSales/p19',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p19
        })
    }
});

app.get('/store1v2/prodSales/p20',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p20
        })
    }
});

app.get('/store1v2/prodSales/p21',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p21
        })
    }
});

app.get('/store1v2/prodSales/p22',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p22
        })
    }
});

app.get('/store1v2/prodSales/p23',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p23
        })
    }
});

app.get('/store1v2/prodSales/p24',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p24
        })
    }
});

app.get('/store1v2/prodSales/p25',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p25
        })
    }
});

app.get('/store1v2/prodSales/p26',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p26
        })
    }
});

app.get('/store1v2/prodSales/p27',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p27
        })
    }
});

app.get('/store1v2/prodSales/p28',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p28
        })
    }
});

app.get('/store1v2/prodSales/p29',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p29
        })
    }
});

app.get('/store1v2/prodSales/p30',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p30
        })
    }
});

app.get('/store1v2/prodSales/p31',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p31
        })
    }
});

app.get('/store1v2/prodSales/p32',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p32
        })
    }
});

app.get('/store1v2/prodSales/p33',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p33
        })
    }
});

app.get('/store1v2/prodSales/p34',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p34
        })
    }
});

app.get('/store1v2/prodSales/p35',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p35
        })
    }
});

app.get('/store1v2/prodSales/p36',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p36
        })
    }
});

app.get('/store1v2/prodSales/p37',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p37
        })
    }
});

app.get('/store1v2/prodSales/p38',(req,res)=>{
    
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p38
        })
    }
});

app.get('/store1v2/prodSales/p39',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p39
        })
    }
});

app.get('/store1v2/prodSales/p40',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p40
        })
    }
});

app.get('/store1v2/prodSales/p41',(req,res)=>{
       const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p41
        })
    }
});

app.get('/store1v2/prodSales/p42',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p42
        })
    }
});

app.get('/store1v2/prodSales/p43',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p43
        })
    }
});

app.get('/store1v2/prodSales/p44',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p44
        })
    }
});

app.get('/store1v2/prodSales/p45',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p45
        })
    }
});

app.get('/store1v2/prodSales/p46',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p46
        })
    }
});

app.get('/store1v2/prodSales/p47',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p47
        })
    }
});

app.get('/store1v2/prodSales/p48',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p48
        })
    }
});

app.get('/store1v2/prodSales/p49',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p49
        })
    }
});

app.get('/store1v2/prodSales/p50',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p50
        })
    }
});

app.get('/store1v2/prodSales/p51',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.prodSales.p51
        })
    }
});

app.get('/store1v2/depSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.depSales
        })
    }
});

app.get('/store1v2/depSales/d1',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.depSales.d1
        })
    }
});

app.get('/store1v2/depSales/d2',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.depSales.d2
        })
    }
});

app.get('/store1v2/depSales/d3',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    
    console.log(store5.vegard);
        return res.json({
            data:store1v2.depSales.d3
        })
    }
});

app.get('/store1v2/depSales/d4',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.depSales.d4
        })
    }
});

app.get('/store1v2/depSales/d5',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.depSales.d5
        })
    }
});

app.get('/store1v2/depSales/d6',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.depSales.d6
        })
    }
});

app.get('/store1v2/depSales/d7',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.depSales.d7
        })
    }
});

app.get('/store1v2/depSales/d8',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store1v2.depSales.d8
        })
    }
});
app.get('/store2v2/productMonth',(req,res)=>{
    month=req.query.month;
    console.log("store2v2.productMonth");
    if(month==0){
        return res.json({
            data:store2v2.productMonth
        })
 
    }else{
        return res.json({
            data:store2v2.productMonth[month-1]
        })

    }

});
app.get('/store2v2/totSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
         
            data:store2v2.totSales

        })
    }
    

});
app.get('/store2v2/addSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
         
            data:store2v2.addSales

        })
    }
    

});
app.get('/store2v2/prodSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales
        })
    }
});

app.get('/store2v2/prodSales/p1',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p1
        })
    }
});

app.get('/store2v2/prodSales/p2',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p2
        })
    }
        
});

app.get('/store2v2/prodSales/p3',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p3
        })
    }
});

app.get('/store2v2/prodSales/p4',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p4
        })
    }
});

app.get('/store2v2/prodSales/p5',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p5
        })
    }
});

app.get('/store2v2/prodSales/p6',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p6
        })
    }
});

app.get('/store2v2/prodSales/p7',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p7
        })
    }
});

app.get('/store2v2/prodSales/p8',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p8
        })
    }
});

app.get('/store2v2/prodSales/p9',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p9
        })
    }
});

app.get('/store2v2/prodSales/p10',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p10
        })
    }
});

app.get('/store2v2/prodSales/p11',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p11
        })
    }
});

app.get('/store2v2/prodSales/p12',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p12
        })
    }
});

app.get('/store2v2/prodSales/p13',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p13
        })
    }
});

app.get('/store2v2/prodSales/p14',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p14
        })
    }
});

app.get('/store2v2/prodSales/p15',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p15
        })
    }
});

app.get('/store2v2/prodSales/p16',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p16
        })
    }
});

app.get('/store2v2/prodSales/p17',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p17
        })
    }
});

app.get('/store2v2/prodSales/p18',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p18
        })
    }
});

app.get('/store2v2/prodSales/p19',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p19
        })
    }
});

app.get('/store2v2/prodSales/p20',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p20
        })
    }
});

app.get('/store2v2/prodSales/p21',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p21
        })
    }
});

app.get('/store2v2/prodSales/p22',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p22
        })
    }
});

app.get('/store2v2/prodSales/p23',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p23
        })
    }
});

app.get('/store2v2/prodSales/p24',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p24
        })
    }
});

app.get('/store2v2/prodSales/p25',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p25
        })
    }
});

app.get('/store2v2/prodSales/p26',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p26
        })
    }
});

app.get('/store2v2/prodSales/p27',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p27
        })
    }
});

app.get('/store2v2/prodSales/p28',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p28
        })
    }
});

app.get('/store2v2/prodSales/p29',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p29
        })
    }
});

app.get('/store2v2/prodSales/p30',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p30
        })
    }
});

app.get('/store2v2/prodSales/p31',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p31
        })
    }
});

app.get('/store2v2/prodSales/p32',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p32
        })
    }
});

app.get('/store2v2/prodSales/p33',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p33
        })
    }
});

app.get('/store2v2/prodSales/p34',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p34
        })
    }
});

app.get('/store2v2/prodSales/p35',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p35
        })
    }
});

app.get('/store2v2/prodSales/p36',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p36
        })
    }
});

app.get('/store2v2/prodSales/p37',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p37
        })
    }
});

app.get('/store2v2/prodSales/p38',(req,res)=>{
    
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p38
        })
    }
});

app.get('/store2v2/prodSales/p39',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p39
        })
    }
});

app.get('/store2v2/prodSales/p40',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p40
        })
    }
});

app.get('/store2v2/prodSales/p41',(req,res)=>{
       const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p41
        })
    }
});

app.get('/store2v2/prodSales/p42',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p42
        })
    }
});

app.get('/store2v2/prodSales/p43',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p43
        })
    }
});

app.get('/store2v2/prodSales/p44',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p44
        })
    }
});

app.get('/store2v2/prodSales/p45',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p45
        })
    }
});

app.get('/store2v2/prodSales/p46',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p46
        })
    }
});

app.get('/store2v2/prodSales/p47',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p47
        })
    }
});

app.get('/store2v2/prodSales/p48',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p48
        })
    }
});

app.get('/store2v2/prodSales/p49',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p49
        })
    }
});

app.get('/store2v2/prodSales/p50',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p50
        })
    }
});

app.get('/store2v2/prodSales/p51',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.prodSales.p51
        })
    }
});

app.get('/store2v2/depSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.depSales
        })
    }
});

app.get('/store2v2/depSales/d1',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.depSales.d1
        })
    }
});

app.get('/store2v2/depSales/d2',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.depSales.d2
        })
    }
});

app.get('/store2v2/depSales/d3',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    
    console.log(store5.vegard);
        return res.json({
            data:store2v2.depSales.d3
        })
    }
});

app.get('/store2v2/depSales/d4',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.depSales.d4
        })
    }
});

app.get('/store2v2/depSales/d5',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.depSales.d5
        })
    }
});

app.get('/store2v2/depSales/d6',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.depSales.d6
        })
    }
});

app.get('/store2v2/depSales/d7',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.depSales.d7
        })
    }
});

app.get('/store2v2/depSales/d8',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store2v2.depSales.d8
        })
    }
});
app.get('/store3v2/productMonth',(req,res)=>{
    month=req.query.month;
    console.log("store3v2.productMonth");
    if(month==0){
        return res.json({
            data:store3v2.productMonth
        })
 
    }else{
        return res.json({
            data:store3v2.productMonth[month-1]
        })

    }

});
app.get('/store3v2/totSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
         
            data:store3v2.totSales

        })
    }
    

});
app.get('/store3v2/addSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
         
            data:store3v2.addSales

        })
    }
    

});
app.get('/store3v2/prodSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales
        })
    }
});

app.get('/store3v2/prodSales/p1',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p1
        })
    }
});

app.get('/store3v2/prodSales/p2',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p2
        })
    }
        
});

app.get('/store3v2/prodSales/p3',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p3
        })
    }
});

app.get('/store3v2/prodSales/p4',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p4
        })
    }
});

app.get('/store3v2/prodSales/p5',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p5
        })
    }
});

app.get('/store3v2/prodSales/p6',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p6
        })
    }
});

app.get('/store3v2/prodSales/p7',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p7
        })
    }
});

app.get('/store3v2/prodSales/p8',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p8
        })
    }
});

app.get('/store3v2/prodSales/p9',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p9
        })
    }
});

app.get('/store3v2/prodSales/p10',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p10
        })
    }
});

app.get('/store3v2/prodSales/p11',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p11
        })
    }
});

app.get('/store3v2/prodSales/p12',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p12
        })
    }
});

app.get('/store3v2/prodSales/p13',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p13
        })
    }
});

app.get('/store3v2/prodSales/p14',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p14
        })
    }
});

app.get('/store3v2/prodSales/p15',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p15
        })
    }
});

app.get('/store3v2/prodSales/p16',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p16
        })
    }
});

app.get('/store3v2/prodSales/p17',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p17
        })
    }
});

app.get('/store3v2/prodSales/p18',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p18
        })
    }
});

app.get('/store3v2/prodSales/p19',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p19
        })
    }
});

app.get('/store3v2/prodSales/p20',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p20
        })
    }
});

app.get('/store3v2/prodSales/p21',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p21
        })
    }
});

app.get('/store3v2/prodSales/p22',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p22
        })
    }
});

app.get('/store3v2/prodSales/p23',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p23
        })
    }
});

app.get('/store3v2/prodSales/p24',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p24
        })
    }
});

app.get('/store3v2/prodSales/p25',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p25
        })
    }
});

app.get('/store3v2/prodSales/p26',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p26
        })
    }
});

app.get('/store3v2/prodSales/p27',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p27
        })
    }
});

app.get('/store3v2/prodSales/p28',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p28
        })
    }
});

app.get('/store3v2/prodSales/p29',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p29
        })
    }
});

app.get('/store3v2/prodSales/p30',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p30
        })
    }
});

app.get('/store3v2/prodSales/p31',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p31
        })
    }
});

app.get('/store3v2/prodSales/p32',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p32
        })
    }
});

app.get('/store3v2/prodSales/p33',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p33
        })
    }
});

app.get('/store3v2/prodSales/p34',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p34
        })
    }
});

app.get('/store3v2/prodSales/p35',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p35
        })
    }
});

app.get('/store3v2/prodSales/p36',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p36
        })
    }
});

app.get('/store3v2/prodSales/p37',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p37
        })
    }
});

app.get('/store3v2/prodSales/p38',(req,res)=>{
    
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p38
        })
    }
});

app.get('/store3v2/prodSales/p39',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p39
        })
    }
});

app.get('/store3v2/prodSales/p40',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p40
        })
    }
});

app.get('/store3v2/prodSales/p41',(req,res)=>{
       const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p41
        })
    }
});

app.get('/store3v2/prodSales/p42',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p42
        })
    }
});

app.get('/store3v2/prodSales/p43',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p43
        })
    }
});

app.get('/store3v2/prodSales/p44',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p44
        })
    }
});

app.get('/store3v2/prodSales/p45',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p45
        })
    }
});

app.get('/store3v2/prodSales/p46',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p46
        })
    }
});

app.get('/store3v2/prodSales/p47',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p47
        })
    }
});

app.get('/store3v2/prodSales/p48',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p48
        })
    }
});

app.get('/store3v2/prodSales/p49',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p49
        })
    }
});

app.get('/store3v2/prodSales/p50',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p50
        })
    }
});

app.get('/store3v2/prodSales/p51',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.prodSales.p51
        })
    }
});

app.get('/store3v2/depSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.depSales
        })
    }
});

app.get('/store3v2/depSales/d1',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.depSales.d1
        })
    }
});

app.get('/store3v2/depSales/d2',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.depSales.d2
        })
    }
});

app.get('/store3v2/depSales/d3',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    
    console.log(store5.vegard);
        return res.json({
            data:store3v2.depSales.d3
        })
    }
});

app.get('/store3v2/depSales/d4',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.depSales.d4
        })
    }
});

app.get('/store3v2/depSales/d5',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.depSales.d5
        })
    }
});

app.get('/store3v2/depSales/d6',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.depSales.d6
        })
    }
});

app.get('/store3v2/depSales/d7',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.depSales.d7
        })
    }
});

app.get('/store3v2/depSales/d8',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store3v2.depSales.d8
        })
    }
});
app.get('/store4v2/productMonth',(req,res)=>{
    month=req.query.month;
    console.log("store4v2.productMonth");
    if(month==0){
        return res.json({
            data:store4v2.productMonth
        })
 
    }else{
        return res.json({
            data:store4v2.productMonth[month-1]
        })

    }

});
app.get('/store4v2/productMonth',(req,res)=>{
    month=req.query.month;
    console.log("store4v2.productMonth");
    if(month==0){
        return res.json({
            data:store4v2.productMonth
        })
 
    }else{
        return res.json({
            data:store4v2.productMonth[month-1]
        })

    }

});
app.get('/store4v2/totSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
         
            data:store4v2.totSales

        })
    }
    

});
app.get('/store4v2/addSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
         
            data:store4v2.addSales

        })
    }
    

});
app.get('/store4v2/prodSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales
        })
    }
});

app.get('/store4v2/prodSales/p1',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p1
        })
    }
});

app.get('/store4v2/prodSales/p2',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p2
        })
    }
        
});

app.get('/store4v2/prodSales/p3',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p3
        })
    }
});

app.get('/store4v2/prodSales/p4',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p4
        })
    }
});

app.get('/store4v2/prodSales/p5',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p5
        })
    }
});

app.get('/store4v2/prodSales/p6',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p6
        })
    }
});

app.get('/store4v2/prodSales/p7',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p7
        })
    }
});

app.get('/store4v2/prodSales/p8',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p8
        })
    }
});

app.get('/store4v2/prodSales/p9',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p9
        })
    }
});

app.get('/store4v2/prodSales/p10',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p10
        })
    }
});

app.get('/store4v2/prodSales/p11',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p11
        })
    }
});

app.get('/store4v2/prodSales/p12',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p12
        })
    }
});

app.get('/store4v2/prodSales/p13',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p13
        })
    }
});

app.get('/store4v2/prodSales/p14',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p14
        })
    }
});

app.get('/store4v2/prodSales/p15',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p15
        })
    }
});

app.get('/store4v2/prodSales/p16',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p16
        })
    }
});

app.get('/store4v2/prodSales/p17',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p17
        })
    }
});

app.get('/store4v2/prodSales/p18',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p18
        })
    }
});

app.get('/store4v2/prodSales/p19',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p19
        })
    }
});

app.get('/store4v2/prodSales/p20',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p20
        })
    }
});

app.get('/store4v2/prodSales/p21',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p21
        })
    }
});

app.get('/store4v2/prodSales/p22',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p22
        })
    }
});

app.get('/store4v2/prodSales/p23',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p23
        })
    }
});

app.get('/store4v2/prodSales/p24',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p24
        })
    }
});

app.get('/store4v2/prodSales/p25',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p25
        })
    }
});

app.get('/store4v2/prodSales/p26',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p26
        })
    }
});

app.get('/store4v2/prodSales/p27',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p27
        })
    }
});

app.get('/store4v2/prodSales/p28',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p28
        })
    }
});

app.get('/store4v2/prodSales/p29',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p29
        })
    }
});

app.get('/store4v2/prodSales/p30',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p30
        })
    }
});

app.get('/store4v2/prodSales/p31',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p31
        })
    }
});

app.get('/store4v2/prodSales/p32',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p32
        })
    }
});

app.get('/store4v2/prodSales/p33',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p33
        })
    }
});

app.get('/store4v2/prodSales/p34',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p34
        })
    }
});

app.get('/store4v2/prodSales/p35',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p35
        })
    }
});

app.get('/store4v2/prodSales/p36',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p36
        })
    }
});

app.get('/store4v2/prodSales/p37',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p37
        })
    }
});

app.get('/store4v2/prodSales/p38',(req,res)=>{
    
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p38
        })
    }
});

app.get('/store4v2/prodSales/p39',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p39
        })
    }
});

app.get('/store4v2/prodSales/p40',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p40
        })
    }
});

app.get('/store4v2/prodSales/p41',(req,res)=>{
       const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p41
        })
    }
});

app.get('/store4v2/prodSales/p42',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p42
        })
    }
});

app.get('/store4v2/prodSales/p43',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p43
        })
    }
});

app.get('/store4v2/prodSales/p44',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p44
        })
    }
});

app.get('/store4v2/prodSales/p45',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p45
        })
    }
});

app.get('/store4v2/prodSales/p46',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p46
        })
    }
});

app.get('/store4v2/prodSales/p47',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p47
        })
    }
});

app.get('/store4v2/prodSales/p48',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p48
        })
    }
});

app.get('/store4v2/prodSales/p49',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p49
        })
    }
});

app.get('/store4v2/prodSales/p50',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p50
        })
    }
});

app.get('/store4v2/prodSales/p51',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.prodSales.p51
        })
    }
});

app.get('/store4v2/depSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.depSales
        })
    }
});

app.get('/store4v2/depSales/d1',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.depSales.d1
        })
    }
});

app.get('/store4v2/depSales/d2',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.depSales.d2
        })
    }
});

app.get('/store4v2/depSales/d3',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    
    console.log(store5.vegard);
        return res.json({
            data:store4v2.depSales.d3
        })
    }
});

app.get('/store4v2/depSales/d4',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.depSales.d4
        })
    }
});

app.get('/store4v2/depSales/d5',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.depSales.d5
        })
    }
});

app.get('/store4v2/depSales/d6',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.depSales.d6
        })
    }
});

app.get('/store4v2/depSales/d7',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.depSales.d7
        })
    }
});

app.get('/store4v2/depSales/d8',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store4v2.depSales.d8
        })
    }
});
app.get('/store5v2/productMonth',(req,res)=>{
    month=req.query.month;
    console.log("store5v2.productMonth");
    if(month==0){
        return res.json({
            data:store5v2.productMonth
        })
 
    }else{
        return res.json({
            data:store5v2.productMonth[month-1]
        })

    }

});
app.get('/store5v2/totSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
         
            data:store5v2.totSales

        })
    }
    

});
app.get('/store5v2/addSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
         
            data:store5v2.addSales

        })
    }
    

});
app.get('/store5v2/prodSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales
        })
    }
});

app.get('/store5v2/prodSales/p1',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p1
        })
    }
});

app.get('/store5v2/prodSales/p2',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p2
        })
    }
        
});

app.get('/store5v2/prodSales/p3',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p3
        })
    }
});

app.get('/store5v2/prodSales/p4',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p4
        })
    }
});

app.get('/store5v2/prodSales/p5',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p5
        })
    }
});

app.get('/store5v2/prodSales/p6',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p6
        })
    }
});

app.get('/store5v2/prodSales/p7',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p7
        })
    }
});

app.get('/store5v2/prodSales/p8',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p8
        })
    }
});

app.get('/store5v2/prodSales/p9',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p9
        })
    }
});

app.get('/store5v2/prodSales/p10',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p10
        })
    }
});

app.get('/store5v2/prodSales/p11',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p11
        })
    }
});

app.get('/store5v2/prodSales/p12',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p12
        })
    }
});

app.get('/store5v2/prodSales/p13',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p13
        })
    }
});

app.get('/store5v2/prodSales/p14',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p14
        })
    }
});

app.get('/store5v2/prodSales/p15',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p15
        })
    }
});

app.get('/store5v2/prodSales/p16',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p16
        })
    }
});

app.get('/store5v2/prodSales/p17',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p17
        })
    }
});

app.get('/store5v2/prodSales/p18',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p18
        })
    }
});

app.get('/store5v2/prodSales/p19',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p19
        })
    }
});

app.get('/store5v2/prodSales/p20',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p20
        })
    }
});

app.get('/store5v2/prodSales/p21',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p21
        })
    }
});

app.get('/store5v2/prodSales/p22',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p22
        })
    }
});

app.get('/store5v2/prodSales/p23',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p23
        })
    }
});

app.get('/store5v2/prodSales/p24',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p24
        })
    }
});

app.get('/store5v2/prodSales/p25',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p25
        })
    }
});

app.get('/store5v2/prodSales/p26',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p26
        })
    }
});

app.get('/store5v2/prodSales/p27',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p27
        })
    }
});

app.get('/store5v2/prodSales/p28',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p28
        })
    }
});

app.get('/store5v2/prodSales/p29',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p29
        })
    }
});

app.get('/store5v2/prodSales/p30',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p30
        })
    }
});

app.get('/store5v2/prodSales/p31',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p31
        })
    }
});

app.get('/store5v2/prodSales/p32',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p32
        })
    }
});

app.get('/store5v2/prodSales/p33',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p33
        })
    }
});

app.get('/store5v2/prodSales/p34',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p34
        })
    }
});

app.get('/store5v2/prodSales/p35',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p35
        })
    }
});

app.get('/store5v2/prodSales/p36',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p36
        })
    }
});

app.get('/store5v2/prodSales/p37',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p37
        })
    }
});

app.get('/store5v2/prodSales/p38',(req,res)=>{
    
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p38
        })
    }
});

app.get('/store5v2/prodSales/p39',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p39
        })
    }
});

app.get('/store5v2/prodSales/p40',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p40
        })
    }
});

app.get('/store5v2/prodSales/p41',(req,res)=>{
       const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p41
        })
    }
});

app.get('/store5v2/prodSales/p42',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p42
        })
    }
});

app.get('/store5v2/prodSales/p43',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p43
        })
    }
});

app.get('/store5v2/prodSales/p44',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p44
        })
    }
});

app.get('/store5v2/prodSales/p45',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p45
        })
    }
});

app.get('/store5v2/prodSales/p46',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p46
        })
    }
});

app.get('/store5v2/prodSales/p47',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p47
        })
    }
});

app.get('/store5v2/prodSales/p48',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p48
        })
    }
});

app.get('/store5v2/prodSales/p49',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p49
        })
    }
});

app.get('/store5v2/prodSales/p50',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p50
        })
    }
});

app.get('/store5v2/prodSales/p51',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.prodSales.p51
        })
    }
});

app.get('/store5v2/depSales',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.depSales
        })
    }
});

app.get('/store5v2/depSales/d1',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.depSales.d1
        })
    }
});

app.get('/store5v2/depSales/d2',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.depSales.d2
        })
    }
});

app.get('/store5v2/depSales/d3',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    
    console.log(store5.vegard);
        return res.json({
            data:store5v2.depSales.d3
        })
    }
});

app.get('/store5v2/depSales/d4',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.depSales.d4
        })
    }
});

app.get('/store5v2/depSales/d5',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.depSales.d5
        })
    }
});

app.get('/store5v2/depSales/d6',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.depSales.d6
        })
    }
});

app.get('/store5v2/depSales/d7',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.depSales.d7
        })
    }
});

app.get('/store5v2/depSales/d8',(req,res)=>{
    const token =req.query.token
    if(verify(token)){
    console.log(store5.vegard);
        return res.json({
            data:store5v2.depSales.d8
        })
    }
});

// await / async function :D går säkert att göra som en egen funktion
app.get('/add',(req,res)=>{
   
   
    const {username,password,first_name,last_name,store,admin,phone,email,department,depId,token}=req.query; 
    if(verify(token)){
        const bcrypt = require('bcrypt');    
        const saltRounds = 10;
        console.log("Yo");
    console.log(username,password,first_name,last_name,store,admin,phone,email,department);
    const hashPassword = async (password,saltRounds) => {
        const hash = await bcrypt.hash(password, saltRounds)
        console.log(hash)
        console.log(await bcrypt.compare(password, hash))
     
        const INSERT_USER_QUERY=`INSERT INTO user (username,password,first_name,last_name,store,admin,phone,email,department,depId) VALUES('${username}','${hash}','${first_name}','${last_name}','${store}',${admin},'${phone}','${email}','${department}',${depId})`;
        console.log(INSERT_USER_QUERY);
       connection.query(INSERT_USER_QUERY,(err, result) =>{
        if(err){
            console.log(err);
            return res.send(false)
        }
        else{
            console.log("inserted");
        return res.send(true)
        
    }
    
        });
      }
    const encryptedPassword=  hashPassword(password,saltRounds);
    console.log(encryptedPassword); 
    
    //const encryptedPassword =  bcrypt.hash(password, saltRounds);
    }
});
app.get('/login',(req,res)=>{
    const bcrypt = require('bcrypt');
    require('dotenv').config({path:__dirname+'/routes/'})    
    const {username,password}=req.query; 
    let refreshToken;
    saltRounds=10;
    console.log(username,password);
        connection.query(`SELECT * FROM user WHERE username ='${username}'`,function (error, results, fields) {
          if (error) {
            console.log("ej klar");        
            return res.send(false)
          }else{
            if(results.length >0){
                bcrypt.compare(password, results[0].password, function(err, ress) {
                    if(!ress){
                        console.log("fel lösen");
                        return res.send(false)
                    }else{            
                        console.log("klar");
                        //use the payload to store information about the user such as username, user role, etc.
                        let payload = {username: username}

    //create the access token with the shorter lifespan
    console.log(process.env.ACCESS_TOKEN_SECRET);
                        let accessToken = jwt.sign({username:username}, process.env.ACCESS_TOKEN_SECRET, {
                        algorithm: "HS256",
                    expiresIn: process.env.ACCESS_TOKEN_LIFE
                    })

    //create the refresh token with the longer lifespan
                    refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: process.env.REFRESH_TOKEN_LIFE
                   
    })
    console.log(accessToken);
    testToken=accessToken;
    uppdateAccessToken(refreshToken,username);

   //res.cookie("jwt", accessToken, {secure: true, httpOnly: true})
//res.render()          
    console.log(results[0].username,results[0].store,results[0].admin,accessToken); 
                        return res.send([true,results[0].username,results[0].store,results[0].admin,accessToken,results[0].department])
                    }
                });         
            }
            else{
                console.log("username doesn't exist");
                return res.send(false)
            }
          }
        });
   
       

});
 function uppdateAccessToken(refreshToken,username){
    const SET_REFRESHTOKEN=`UPDATE user SET refreshToken='${refreshToken}' WHERE user.username='${username}'`;    
    connection.query(SET_REFRESHTOKEN,function (error, results, fields) {
        if(error){
            console.log("error");
        }
    });  

}
function refreshTokenUppdate(username){
    const SET_REFRESHTOKEN=`Select refreshToken FROM user where username='${username}'`;    
    connection.query(SET_REFRESHTOKEN,function (error, results, fields) {
        if(error){
            console.log("error");
            return false;
        }
        else{
            try{
                jwt.verify(results, process.env.REFRESH_TOKEN_SECRET)
                return true;
            }
            catch(e){
                return false;                                                                       
            }

        }
    });  

}
function refresh(username,accessToken){
   
    //let accessToken=req.cookies
    accessToken=testToken;
    console.log(accessToken);

    let payload
    try{
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    }
    catch(e){
        return false
    }
    if(refreshTokenUppdate(username)){
        let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, 
            {
                algorithm: "HS256",
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            })
        
        return newToken


    }
   

  }
  function verify(accessToken){
    if(!accessToken){
        return false

    }
    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        return true;
    }
    catch(e){
        //if an error occured return request unauthorized error
        return false
    }


  }

app.get('/addProfilePic',(req,res)=>{
 
    const {filename,username,token}=req.query; 
    if(verify(token)){
     download(filename,username,function(){
        console.log("done");


     });

        const INSERT_USER_QUERY=`UPDATE user SET profilePath=http://tollo.duckdns.org:61338/public/'${username+'.png'}' WHERE user.username='${username}'`;
        console.log(INSERT_USER_QUERY);
       connection.query(INSERT_USER_QUERY,(err, result) =>{
        if(err){
            console.log(err);
            return res.send(false)
        }
        else{
            console.log("inserted");
        return res.send(true)
        
    }
    
        });

    }
    //const encryptedPassword =  bcrypt.hash(password, saltRounds);
   
});
app.get('/changePic',(req,res)=>{
  
    //const {username,password}=req.query; 
    download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
    console.log('done');
  });
});

var download = async function(uri, filename, callback){
    filename='C:/Users/asder256/Documents/kand/kandServer/images/'+filename+'.png';
    console.log(filename);
    await new Promise((resolve,reject)=>{
        request({
            uri:uri,
            gzip:true,

        })
        .pipe(fs.createWriteStream(filename))
        .on('finish',async()=>{
            console.log(`The file is finished downloading.`);
            resolve();
        })
        .on('error', (error) => {
            reject(error);
          });

    })
    .catch((error) => {
        console.log(`Something happened: ${error}`);
      });
    // request.head(uri, function(err, res, body){
    //   console.log('content-type:', res.headers['content-type']);
    //   console.log('content-length:', res.headers['content-length']);
  
    //   request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    // });
  };
  app.get('/getUsers',(req,res)=>{
    const {username,token}=req.query;
    console.log("hej")
    console.log(username);

    if(verify(token)){
        var SELECT_ALL_USERS=`SELECT username,first_name,last_name,store,department,phone,email,profilePath,depId,admin,membersGoal,productGoal FROM user where username='${username}'`;
         console.log("one user");
    connection.query(SELECT_ALL_USERS,(err, result) =>{
        console.log(result)
        
        return res.json({
            
            data:result,
        })
});
    }
});
app.get('/getUsersAdmin',(req,res)=>{
    const {store,department,allUsers,token}=req.query;
    console.log(store);
    console.log(department);

    if(verify(token)){ 
        if(allUsers==2){
            var SELECT_ALL_USERS=`SELECT username,first_name,last_name,store,phone,email,department FROM user where store=${store}`;
           // console.log("select users admin all stores");
        connection.query(SELECT_ALL_USERS,(err, result) =>{
            console.log(result)
            return res.json({
                
                data:result
            })
            
        });

        }else{
            var SELECT_ALL_USERS=`SELECT username,first_name,last_name,store,phone,email,department FROM user where store=${store} and department='${department}'`;
            console.log("select users admin");
        connection.query(SELECT_ALL_USERS,(err, result) =>{
            console.log(result)
            return res.json({
                
                data:result
            })
            
        });
        }
       

    
}
});
app.get('/updateUserPhone',(req,res)=>{
    const {username,phone,token}=req.query;  
    if(verify(token)){
        const INSERT_USER_QUERY=`UPDATE user SET phone='${phone}' WHERE user.username='${username}'`;
        console.log("update phone");
    connection.query(INSERT_USER_QUERY,(err, result) =>{
        console.log("hit");
            if(err){
                console.log("error");
                return res.json({
            
                    data:(false)
                })

            }   
       
            return res.send([true])

       
        
    });
    
    }


});  
    
app.get('/updateUserEmail',(req,res)=>{
    const {username,email,token}=req.query;     
    if(verify(token)){
    const INSERT_USER_QUERY=`UPDATE user SET email='${email}' WHERE user.username='${username}'`;
        console.log("update email");
   
    connection.query(INSERT_USER_QUERY,(err, result) =>{
        if(err){
            return res.send(false,"username wrong")

        }
        return res.json({
            
            data:(true,result)
        })
});
    }
});  
app.get('/updateUserPassword',(req,res)=>{
    const {username,newPassword,token}=req.query;
    if(verify(token)){
    const bcrypt = require('bcrypt');
    const saltRounds=10;     
   
    const hashPassword = async (newPassword,saltRounds) => {
        const hash = await bcrypt.hash(newPassword, saltRounds)
        console.log(hash)
        console.log(await bcrypt.compare(newPassword, hash))
        const INSERT_USER_QUERY=`UPDATE user SET password='${hash}' WHERE user.username='${username}'`;
        console.log(INSERT_USER_QUERY);
       connection.query(INSERT_USER_QUERY,(err, result) =>{
        if(err){
            console.log(err);
            return res.json({
            
                data:(false,result)
            })
        }
        else{
            console.log("inserted");
            return res.json({
            
                data:(true,result)
            })
    }
    
        });
      }
      const encryptedPassword=  hashPassword(newPassword,saltRounds);
      console.log(encryptedPassword);
   
   // }
    }
});
app.get('/updateMember',(req,res)=>{
    const {username,count,goal,token}=req.query;
    console.log("hej");
    console.log(username);
    console.log(count);
    console.log(goal);
    var x=0;
    var INSERT_USER_QUERY="";
    
    if(goal ==0 || goal==undefined ){
         INSERT_USER_QUERY=`UPDATE user SET members=${count} WHERE user.username=${username}`;
         console.log("in hit");

    }else{
         INSERT_USER_QUERY=`UPDATE user SET members=${count},membersGoal=${goal} WHERE user.username=${username}`;
        console.log("insert");
    }
  
   
       
        // if(verify(token)){
            if(verify(token)){
                 connection.query(INSERT_USER_QUERY,(err, result) =>{
                    console.log(err)
                     console.log(result)
                     return res.json({
            
                        data:("hej Erik",count)
                    })
             });
     
     
            }


  
        
      
   // }

});   
app.get('/updateProduct',(req,res)=>{
    
    const {username,count,goal,token}=req.query;
    if(verify(token)){
    console.log("hejsan");
    console.log(username);
    console.log(count);
    var x=0;
    console.log(goal)
    var INSERT_USER_QUERY="";
    if(goal ==0 || goal==undefined ){
         INSERT_USER_QUERY=`UPDATE user SET productSold=${count} WHERE user.username=${username}`;

    }else{
         INSERT_USER_QUERY=`UPDATE user SET productSold=${count},productMonth=${goal} WHERE user.username=${username}`;

    }
  
            connection.query(INSERT_USER_QUERY,(err, result) =>{
                console.log(result)
                return res.json({
            
                    data:("hej Erik",count)
                })
        });


        
      
    }
});
app.get('/getMemberProduct',(req,res)=>{  
    const {username,token}=req.query;
    console.log(username);
    const INSERT_USER_QUERY=`Select members,productSold from user WHERE user.username=${username}`;
    if(verify(token)){
             connection.query(INSERT_USER_QUERY,(err, result,fields) =>{
                
                 console.log("got member result");
                 return res.json({
            
                    data:("members uppdated changed",result[0],result[0])
                })
               
         });
        }

});
app.get('/updateGoal',(req,res)=>{  
    const {username,member,count,token}=req.query;
    console.log(username+" updateGoal");
    console.log(member);
    console.log("hej");
    
   
    if(verify(token) ){
    var INSERT_USER_QUERY=`Select members,productSold from user WHERE user.username='${username}'`;
    if(member==1){
         INSERT_USER_QUERY=`Update user set membersGoal=${count},members=0 WHERE user.username='${username}'`;
         connection.query(INSERT_USER_QUERY,(err, result,fields) =>{
         
            console.log("got member result");
            return res.json({
       
               data:(true,"goal uppdated changed",result[0])
           })
          
    });
   }else{
        INSERT_USER_QUERY=`Update user set productGoal=${count},productSold=0 WHERE user.username='${username}'`;
        connection.query(INSERT_USER_QUERY,(err, result,fields) =>{

            console.log("got member result");
            return res.json({
       
               data:(true,"goal uppdated changed",result[0])
           })
          
    });
   }

    }
  
       

});


app.get('/CreateUserGoal',(req,res)=>{  
    const {username,goalDesc,goalMax,type,id,token}=req.query;
    
    console.log(username);
    const INSERT_USER_QUERY=`INSERT INTO usergoal (goalDesc,goalMax,type,prod_depId,goalOfUser) VALUES(${goalDesc},${goalMax},${type},${id},${username})`;
    if(verify(token)){
             connection.query(INSERT_USER_QUERY,(err, result,fields) =>{
             
                 console.log("got member result");
                 return res.json({
            
                    data:result[0]
                })
               
         });
        }

});
//add department later
app.get('/bestSellers',(req,res)=>{  
    const {store,membOrProd,token}=req.query;
    console.log("best sellers");

        console.log(store);
    console.log(membOrProd);
    var SELECT_BEST_SELLER;
    if(store==0 && membOrProd=="'members'"){
        console.log("här");
         SELECT_BEST_SELLER=`SELECT first_name,last_name,members FROM user where admin=0 Order By members DESC`;    

    }else if (membOrProd=="'members'"){
        console.log("här2");
         SELECT_BEST_SELLER=`SELECT first_name,last_name,members FROM user Where store=${store} and admin=0 Order By members DESC`;    

    }else if(store==0 && membOrProd!=="'members'"){
        console.log("här3");
         SELECT_BEST_SELLER=`SELECT first_name,last_name,productSold FROM user where admin=0 Order By productSold DESC`;
        
    }else {
        console.log("borde vara här");
         SELECT_BEST_SELLER=`SELECT first_name,last_name,productSold FROM user Where store=${store} and admin=0  Order By productSold DESC`;

    }
    if(verify(token)){
             connection.query(SELECT_BEST_SELLER,(err, result,fields) =>{
                 console.log(result)
                 console.log("got best sellers");
                 return res.json({
            
                    data:result
                })
               
         });
        }

});
//product id product of the month.
    //create the access token with the shorter lifespan
   
    
 
    




 app.listen(61338, "192.168.0.111", function () {
  console.log("console: Listening");
 });

//  app.listen(61339, "192.168.0.111", function () {
//     console.log("console: Listening");
// });


