import React, { useState, useEffect } from "react";
import axios from 'axios';

interface Team {
  pool: string;
  position: number;
  team_name: string;
  played: number;
  w: number;
  d: number;
  l: number;
  pf: number;
  pa: number;
  pd: number;
  tf: number;
  ta: number;
  bonus: number;
  pts: number;
  id: number;
}

function Pools() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    axios.get<Team[]>('http://localhost:3000/Pools')
      .then((response) => {
        setTeams(response.data);
      })
  }, []);

  const pools: { [key: string]: Team[] } = {};

  teams.forEach((team) => {
    if (!pools[team.pool]) {
      pools[team.pool] = [];
    }
    pools[team.pool].push(team);
  });

  const sortedPools = Object.entries(pools).sort(([poolA], [poolB]) => poolA.localeCompare(poolB));

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h1>Pools</h1>
      <hr/>
      {sortedPools.map(([pool, teams]) => {
        teams.sort((teamA, teamB) => teamB.pts - teamA.pts);
       
        return (
          <div key={pool} style={{ border: "1px solid #ccc", marginBottom: "20px", padding: "10px" }}>
            <h2>
              <img src={`icons/pool${pool}.png`} width="80" alt={`Pool ${pool}`} />
            </h2>
            <table style={{ width: "100%" }} className="table">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Played</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>PD</th>
                  <th>PF</th>
                  <th>PA</th>
                  <th>Bonus</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={team.team_name} style={{ backgroundColor: index < 2 ? '#f5f5f5' : 'inherit' }}>
                    <td><img src={`icons/${team.id}.png`} width="20" height="20"/> {team.team_name}</td>
                    <td>{team.played}</td>
                    <td>{team.w}</td>
                    <td>{team.d}</td>
                    <td>{team.l}</td>
                    <td>{team.pd}</td>
                    <td>{team.pf}</td>
                    <td>{team.pa}</td>
                    <td>{team.bonus}</td>
                    <td>{team.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default Pools;