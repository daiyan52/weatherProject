const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
 const app = express();

app.use(bodyParser.urlencoded({extended: true}));
 app.get("/",function(req,res){

   res.sendFile(__dirname + "/index.html");
 });

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "9f1904398aac31f16c663c76173f74ed";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      //console.log(data);
      const weatherData = JSON.parse(data)
      // console.log(weatherData);
      // const object = {
      //   name: "Daiyan",
      //   favouriteFood: "Chicken"
      // }
      // console.log(JSON.stringify(object));


      const temp = weatherData.main.temp
      // console.log(temp);

      const weatherDescription = weatherData.weather[0].description
      // console.log(weatherDescription);
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The currently weather is " + weatherDescription + "<p>");
      res.write("<h1>The temp of "+ query +" is " + temp + " degree celcius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
})


 app.listen(3000, function(){
   console.log("server is runningg on port 3000.");
 });
