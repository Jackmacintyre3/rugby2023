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

function ResultsByDate() {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedStage, setSelectedStage] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2023-09-08');

  useEffect(() => {
    axios.get<Result[]>('http://localhost:3000/Results')
      .then((response) => {
        const formattedResults = response.data.map(result => ({
          ...result,
          date: result.date.slice(0, 10),
        }));
        setResults(formattedResults);
      })
  }, []);

  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStage(event.target.value);
  };

  const updateSelectedDate = (daysToAdd: number) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    setSelectedDate(currentDate.toISOString().slice(0, 10));
  };

  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${dayOfWeek} ${day}/${month}/${year}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredResults = results.filter(result => result.date === selectedDate);
  let displayedResults = filteredResults;
 
  if (selectedStage) {
    displayedResults = filteredResults.filter(result => result.stage === selectedStage);
  }
 
  const noMatches = displayedResults.length === 0;

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h1>Results By Date</h1>
      <div className="d-flex align-items-center">
        <button className="btn btn-secondary me-2" onClick={() => updateSelectedDate(-1)}>&lt;&lt;</button>
        <button className="btn btn-secondary ms-2" onClick={() => updateSelectedDate(1)}>&gt;&gt;</button>
      </div>
      <p>{formatDay(selectedDate)}</p>
      <hr />
      {!noMatches ? (
        <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid #ccc" }} className="table">
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
            {displayedResults.map((result, index) => (
              <tr key={result.id}>
                <td>
                  {formatDate(result.date)} {result.time}
                </td>
                <td>{result.stage}</td>
                <td><img src={`icons/${result.team1_id}.png`} width="20" height="20" alt={`${result.team1_name} logo`} /></td>
                <td>{result.team1_name}</td>
                <td>{result.team1_score}-{result.team2_score}</td>
                <td>{result.team2_name}</td>
                <td><img src={`icons/${result.team2_id}.png`} width="20" height="20" alt={`${result.team2_name} logo`} /></td>
                <td>{result.venue_name}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No matches</p>
      )}
    </div>
  );
}

export default ResultsByDate;