// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Button } from 'react-bootstrap';
// import { API_KEY } from './config';

// function CabForm() {
//   const [source, setSource] = useState('');
//   const [destination, setDestination] = useState('');
//   const [time, setTime] = useState(null);
//   const [cost, setCost] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // call API to get shortest time and estimated cost
//     const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${source}&destination=${destination}&key=${API_KEY}`);
//     const data = response.data.routes[0].legs[0];

//     // set time and cost state
//     setTime(data.duration.text);
//     setCost(data.distance.text);
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="formSource">
//         <Form.Label>Source</Form.Label>
//         <Form.Control type="text" placeholder="Enter source address" value={source} onChange={(e) => setSource(e.target.value)} />
//       </Form.Group>

//       <Form.Group controlId="formDestination">
//         <Form.Label>Destination</Form.Label>
//         <Form.Control type="text" placeholder="Enter destination address" value={destination} onChange={(e) => setDestination(e.target.value)} />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Get Time and Cost
//       </Button>

//       {time && cost && (
//         <div>
//           <p>Shortest time: {time}</p>
//           <p>Estimated cost: {cost}</p>
//         </div>
//       )}
//     </Form>
//   );
// }

// export default CabForm;
