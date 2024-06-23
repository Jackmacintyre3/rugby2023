import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Stats {
  player_id: number;
  player_name: string;
  team_id: number;
  team_name: string;
  points: number;
  tackles: number;
}

function Stats() {
  const [stats, setStats] = useState<Stats[]>([]);
  const [selectedStat, setSelectedStat] = useState<'points' | 'tackles'>('points');

  useEffect(() => {
    fetchData(selectedStat);
  }, [selectedStat]);

  const fetchData = (stat: 'points' | 'tackles') => {
    axios.get<Stats[]>(`http://localhost:3000/${stat}`)
      .then((response) => {
        setStats(response.data);
      })
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStat(event.target.value as 'points' | 'tackles');
  };

  const getPlayerInfoLink = (teamName: string, playerId: number) => {
    return `https://www.rugbyworldcup.com/2023/teams/${teamName}/player/${playerId}`;
  };

  const sortedStats = [...stats].sort((a, b) => {
    if (selectedStat === 'points')
    {
      return b.points - a.points;
    }
    else {
      return b.tackles - a.tackles;
    }
  });

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h1>Player Stats</h1>
      <div className="mb-3">
        <label htmlFor="statSelect" className="form-label">Stat: </label>
        <select id="statSelect" className="form-select" value={selectedStat} onChange={handleChange}>
          <option value="points">Points</option>
          <option value="tackles">Tackles</option>
        </select>
      </div>
      <hr />
      <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid #ccc" }} className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Team</th>
            <th>{selectedStat === 'points' ? 'Points' : 'Tackles'}</th>
          </tr>
        </thead>
        <tbody>
          {sortedStats.map((player, index) => (
            <tr key={player.player_id}>
              <td>{index + 1}</td>
              <td><a href={getPlayerInfoLink(player.team_name, player.player_id)} target="_blank" rel="noopener noreferrer"> {player.player_name}</a></td>
              <td><img src={`icons/${player.team_id}.png`} width="20" height="20" alt={`${player.team_name} logo`} /> {player.team_name}</td>
              <td>{selectedStat === 'points' ? player.points : player.tackles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
