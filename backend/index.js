const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const Booking = require('./cabbookeddata')
// connectToMongo(); // Connected To Mongo

mongoose
    .connect('mongodb+srv://root:root@cab.bs5yb1q.mongodb.net/?retryWrites=true&w=majority')
    .then(sucess => console.log({"sucess" : "Mongoose connected sucessfully"}))
    .catch (error => console.log(error));

const app = express();
const port = 5001;

app.use(express.json());
app.use(cors());

app.post("/book", async (req, res) => {
  const {email, source, destination, cab,price,time} = req.body;
  let data = await Booking.create({
    email: email,
    cab: cab,
    source: source,
    destination: destination,
    price:price,
    time:time
  });
   
  await data.save(); // to save data in mongodb compass

  res.send({data});   // 
})

app.listen(port, () => {
    console.log(`iNotebook backend listening on port http://localhost:${port}`)
  })                 //to start the server 