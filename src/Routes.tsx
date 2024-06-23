import React, { useState, useEffect } from "react";
import axios from 'axios';

function Routes() {
  const [jsonData, setJsonData] = useState('');

  function handleButtonClick(url: string) {
    axios.get(url)
      .then((response) => {
        setJsonData(JSON.stringify(response.data,null,3));
      })

  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h1>Routes</h1>
      <hr />
      <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid #ccc" }} className="table table-striped">
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th>Description</th>
            <th>Route</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <td>Get venues</td>
            <td><a href="http://localhost:3000/venues" target="_blank">/venues</a></td>
            <td>
              <button className="btn btn-primary" onClick={() => handleButtonClick("http://localhost:3000/venues")}>Get</button>
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <td>Get teams</td>
            <td><a href="http://localhost:3000/teams" target="_blank">/teams</a></td>
            <td>
              <button className="btn btn-primary" onClick={() => handleButtonClick("http://localhost:3000/teams")}>Get</button>
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <td>Get pool teams</td>
            <td><a href="http://localhost:3000/pools/A" target="_blank">/pools/A</a></td>
            <td>
              <button className="btn btn-primary" onClick={() => handleButtonClick("http://localhost:3000/pools/A")}>Get</button>
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <td>Get players</td>
            <td><a href="http://localhost:3000/players" target="_blank">/players</a></td>
            <td>
              <button className="btn btn-primary" onClick={() => handleButtonClick("http://localhost:3000/players")}>Get</button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h6>JSON response for data: </h6>
      <textarea readOnly value={jsonData} style={{ width: '1200px', height: '190px', resize: 'none', border: "1px solid #ccc", padding: "5px" }}/>
    </div>
  );
}

export default Routes;
