import React, { useState } from 'react';
import './App.css';
import myImage from './cab1.png';



function App() { 
  const places = {
    A: { B: 5, C: 7 },
    B: { D: 15, E: 20 ,A:5},
    C: { D: 5, E: 35 ,A:7},
    D: { F: 20 ,B: 20,C:5},
    E: { F: 10 ,B:20,C:35},
    F:{D:20 , E:10}
  };
  
  const cabs = [
    { name: 'Swift', price: 1.5 }, 
   { name: 'Fortuner', price: 2 },  { name: 'Salavia', price: 2.5 },  
   { name: 'Polo', price: 3 },  { name: 'Audi X3', price: 3.5 },
               ];

  const [selectedCab, setSelectedCab] = useState('');
  const [cabPrice, setCabPrice] = useState(0);

  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [cost, setCost] = useState('');

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const route = getShortestPath(source, destination);
    console.log(route);
    const estimatedTime = route.distance === Infinity ? 'N/A' : `${route.distance} minutes`;
    const estimatedCost = route.distance === Infinity ? 'N/A' : `₹${route.distance * cabPrice}`;
    setTime(estimatedTime);
    setCost(estimatedCost);

    //backend
    await fetch(`http://localhost:5001/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, cab:selectedCab, source, destination, price:estimatedCost, time:estimatedTime }),
    });

    console.log(email,destination,source,selectedCab);
    
    
    alert("Your Cab Booked Sucessfully!");
  };

  

  

  const getShortestPath = (start, end) => {
    const distances = {};
    const visited = {};
    const previous = {};
    let path = [];

    for (let place in places) {
      if (place === start) {
        distances[place] = 0;
      } else {
        distances[place] = Infinity;
      }
      previous[place] = null;
    }

    let currentPlace = start;

    while (currentPlace !== end) {
      for (let neighbor in places[currentPlace]) {
        let distance = places[currentPlace][neighbor];
        let totalDistance = distance + distances[currentPlace];

        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = currentPlace;
        }
      }

      visited[currentPlace] = true;

      let unvisitedPlaces = Object.entries(distances)
        .filter(([place, distance]) => !visited[place])
        .sort((a, b) => a[1] - b[1]);

      if (unvisitedPlaces.length === 0) {
        break;
      }

      currentPlace = unvisitedPlaces[0][0];
    }

    while (previous[currentPlace]) {
      path.push(currentPlace);
      currentPlace = previous[currentPlace];
    }
    path.push(currentPlace);
    path.reverse();

    return { path: path, distance: distances[end] };
  };


  const handleChange = (e) => {
    setCabPrice(Number(e.target.value));
    let v = e.target.value;
    if(v === "0") setSelectedCab("No Cab Selected");
    else if (v === "1.5") setSelectedCab("Swift - ₹1.5 per minute")
    else if (v === "2") setSelectedCab("Fortuner - ₹2 per minute")
    else if (v === "2.5") setSelectedCab("Salavia - ₹2.5 per minute")
    else if (v === "3") setSelectedCab("Audi X3 - ₹3 per minute")
    else if (v === "3.5") setSelectedCab("Polo - ₹3.5 per minute")
    else setSelectedCab("Error");
  }

  return (
    <div className="App">

    <div className="image">
    <img src={myImage} alt="" />
    </div>

      <h1 className="heading" style={{ color: 'white' }} >Cab Service </h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
      <label htmlFor="cab-select" style={{ color: 'white' }}>Select a Cab:</label>
     <select id="cab-select" onChange={handleChange}>
    <option value="0">Select Cab</option>
    <option value="1.5">Swift - ₹1.5 per minute</option>
    <option value="2">Fortuner - ₹2 per minute</option>
    <option value="2.5">Salavia - ₹2.5 per minute</option>
    <option value="3">Audi X3 - ₹3 per minute</option>
    <option value="3.5">Polo - ₹3.5 per minute</option>
      </select>
     </div>


      <div className="form-group">
          <label htmlFor="source" style={{ color: 'white' }}>Enter Your Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
        </div>


        <div className="form-group">
      <label htmlFor="source" style={{ color: 'white' }}>Source</label>
     <select id="source" onChange={(e) => setSource(e.target.value)}>
    <option >Enter Source Location</option>
    <option >A</option>
    <option >B</option>
    <option >C</option>
    <option >D</option>
    <option >E</option>
    <option >F</option>
      </select>
     </div>
        {/* <div className="form-group">
          <label htmlFor="source" style={{ color: 'white' }}>Enter Source Location</label>
          <input type="text" id="source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Enter source location" />
        </div> */}


        <div className="form-group">
      <label htmlFor="source" style={{ color: 'white' }}>Destination</label>
     <select id="source" onChange={(e) => setDestination(e.target.value)}>
    <option >Enter Source Location</option>
    <option >A</option>
    <option >B</option>
    <option >C</option>
    <option >D</option>
    <option >E</option>
    <option >F</option>
      </select>
     </div>

        {/* <div className="form-group">
          <label htmlFor="destination" style={{ color: 'white' }}>Enter Destination Location</label>
          <input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter destination location" />
        </div> */}



        <button type="submit" className="btn">Get Estimate</button>
      </form>

      {time && cost &&
        <div className="result" style={{ color: 'white' }}>
          <p><strong>Estimated Time:</strong> {time}</p>
          <p><strong>Estimated Cost:</strong> {cost}</p>
        </div>
      }
     {/* <div className="places" style={{ color: 'white' }}   >
      <h3 > Destination Available</h3>
      <ul type="none" >
      
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
        <li>E</li>
        <li>F</li>
      </ul>
      </div> */}
      
    </div>

    
  );

  
}



export default App;