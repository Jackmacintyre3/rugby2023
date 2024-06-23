import React, { useState, useEffect } from "react";
import axios from 'axios';

interface Result {
  id: number;
  time: string;
  date: string;
  stage: string;
  team1_name: string;
  team2_name: string;
  venue_name: string;
  player_id: number;
  team1_score: number;
  team2_score: number;
  team1_id: number;
  team2_id: number;

}

function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedStage, setSelectedStage] = useState<string>('');

  useEffect(() => {
    axios.get<Result[]>('http://localhost:3000/Results')
      .then((response) => {
        const formattedResults = response.data.map(result => ({
          ...result,
          date: new Date(result.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).split('/').reverse().join('/'), 
        }));
        setResults(formattedResults);
      })
  }, []);

  const getResultInfoLink = (teamName: string, playerId: number) => {
    return `https://www.rugbyworldcup.com/2023/teams/${teamName}/player/${playerId}`;
  };

  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStage(event.target.value);
  };

  const uniqueStages = Array.from(new Set(results.map(result => result.stage)));

  let filteredResults;
  if (selectedStage) {
    filteredResults = results.filter(result => result.stage === selectedStage);
  } else {
    filteredResults = results;
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h1>Results</h1>
      <hr />
      <div className="mb-3">
        <select id="stageFilter" className="form-select" onChange={handleStageChange} value={selectedStage}>
          <option value="">All Stages</option>
          {uniqueStages.map((stage, index) => (
            <option key={index} value={stage}>{stage}</option>
          ))}
        </select>
      </div>
      <table className="table" style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Stage</th>
            <th></th>
            <th>Team A</th>
            <th></th>
            <th>Team B</th>
            <th></th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((result, index) => (
            <tr key={result.id}>
              <td>{result.date} {result.time}</td>
              <td>{result.stage}</td>
              <td><img src={`icons/${result.team1_id}.png`} width="20" height="20"/></td>
              <td>{result.team1_name}</td>
              <td>{result.team1_score}-{result.team2_score}</td>
              <td>{result.team2_name}</td>
              <td><img src={`icons/${result.team2_id}.png`} width="20" height="20"/></td>
              <td>{result.venue_name}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
