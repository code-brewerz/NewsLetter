const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function (req,res) {
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  // console.log(firstName+lastName+email);
  var data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us18.api.mailchimp.com/3.0/lists/c04a7ce62e",
    method: "POST",
    headers: {"Authorization" :"codeBrewerz 13202f831487d358d1a73902292b4a1c-us18"},
    body:jsonData
  };

  request(options,function (error,response,body) {
      if(error){
        res.sendFile(__dirname+"/failure.html");
      }else if (response.statusCode !=== 200) {
        res.sendFile(__dirname+"/failure.html");
      }


  });


});

app.post("/failure",function (req,res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function () {
  console.log("Server Initiated ...");
});
