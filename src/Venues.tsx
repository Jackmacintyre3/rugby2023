import React, { useState, useEffect } from "react";
import axios from 'axios';

interface Venue {
  id: number;
  name: string;
}

function Venues() {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    axios.get<Venue[]>('http://localhost:3000/Venues')
      .then((response) => {
        setVenues(response.data);
      })
  }, []);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h1>Venues</h1>
      <hr />
      <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid #ccc" }} className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue, index) => (
            <tr key={venue.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{index + 1}</td>
              <td>{venue.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Venues;
