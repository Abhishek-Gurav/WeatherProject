const express = require("express");
const https = require("https")
const bodyParser = require("body-parser")

const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})


app.post("/",function(req, res){
    const query = (req.body.cityName)
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=d24fb42d4138c24d1956131be8be9575"
    https.get(url   , function(response){
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently "+ description + "</p>")
            res.write("<h1>The temperature at " +query + " is " + temp + " degree celsius</h1>")
            res.write("<img src="+ imageUrl +">")
            res.send();
            // res.send("<h1>The temperature at Paris is " + temp + " degree celsius</h1>.<h1>The weather is currently "+ weatherData + "</h1>")
        })
    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000")
})