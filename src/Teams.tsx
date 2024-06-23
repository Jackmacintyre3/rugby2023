import React, { useState, useEffect } from "react";
import axios from 'axios';

interface Team {
  id: number;
  name: string;
  pool: string;
}

type SortField = 'name' | 'pool';

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [sortedTeams, setSortedTeams] = useState<Team[]>([]);
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Team[]>('http://localhost:3000/pools')
      .then((response) => {
        const teamsData = response.data;
        setTeams(teamsData);
        setSortedTeams(teamsData);
      })
  }, []);

  const sortTeamsByField = (field: SortField) => {
    const sorted = [...sortedTeams].sort((a, b) => {
      if (isSortedAsc) {
        return a[field].localeCompare(b[field]);
      } 
      else
      {
        return b[field].localeCompare(a[field]);
      }
    });
    setSortedTeams(sorted);
    setIsSortedAsc(!isSortedAsc);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h1>Teams</h1>
      <hr />
      <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid #ccc" }} className="table">
        <thead>
          <tr>
            <th></th>
            <th onClick={() => sortTeamsByField('name')} style={{ textDecoration: 'none', cursor: 'pointer' }}>Team</th>
            <th onClick={() => sortTeamsByField('pool')} style={{ textDecoration: 'none', cursor: 'pointer' }}>Pool</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => (
            <tr key={team.name} style={{ borderBottom: "1px solid #ccc" }}>
              <td>
                <img src={`icons/${team.id}.png`} width="20" height="20" alt={`Team ${team.name}`} />
              </td>
              <td>{team.name}</td>
              <td>{team.pool}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
