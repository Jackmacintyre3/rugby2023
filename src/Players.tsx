import React, { useState, useEffect } from "react";
import axios from 'axios';

interface Player {
  id: number;
  name: string;
  team_id: number;
  country: string;
  team_name: string;
  player_id: number;
}

function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');

  useEffect(() => {
    axios.get<Player[]>('http://localhost:3000/tap')
      .then((response) => {
        setPlayers(response.data);
      })    
  }, []);

  const getPlayerInfoLink = (teamName: string, playerId: number) => {
    return `https://www.rugbyworldcup.com/2023/teams/${teamName}/player/${playerId}`;
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };

  let filteredPlayers;
  if (selectedTeam) 
  {
    filteredPlayers = players.filter(player => player.team_name === selectedTeam);
  }
  else
  {
    filteredPlayers = players;
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h1>Players</h1>
      <hr />
      <div className="mb-3">
        <select id="teamFilter" className="form-select" onChange={handleTeamChange} value={selectedTeam}>
          <option value="">All Teams</option>
          <option value="Ireland">Ireland</option>
          <option value="England">England</option>
          <option value="New Zealand">New Zealand</option>
          <option value="South Africa">South Africa</option>
        </select>
      </div>
      <table className="table" style={{ border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th></th>
            <th>Player</th>
            <th>Team</th>
            <th>Info *</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player, index) => (
            <tr key={player.id}>
              <td>
                <img src={`icons/${player.team_id}.png`} alt={`Team ${player.team_id}`} width="20" height="20"/>
              </td>
              <td>{player.name}</td>
              <td>{player.team_name}</td>
              <td>
                <a href={getPlayerInfoLink(player.team_name, player.player_id)} target="_blank" rel="noopener noreferrer"> Info...
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Players;
