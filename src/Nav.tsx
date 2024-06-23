import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <img src="/icons/logo2.png" alt="Logo" style={{ width: '90px', padding: '10px' }}  />
      <Link to="/Routes"> Routes</Link> | 
      <Link to="/Venues"> Venues</Link> | 
      <Link to="/Teams"> Teams</Link> | 
      <Link to="/Players"> Players</Link> |
      <Link to="/Results"> Results</Link> |
      <Link to="/ResultsByDate"> Results By Date</Link> |
      <Link to="/Pools"> Pools</Link> |
      <Link to="/Stats"> Player Stats</Link> |
      <Link to="/Login"> Login</Link>
      <hr></hr>
    </nav>
  );
}

export default Nav;
