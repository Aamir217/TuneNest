import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

function NavBar({ songs, setSearchTerm, setFilteredSongs }) {
  const location = useLocation();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    if (query) {
      const results = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query)
      );
      setFilteredSongs(results);
    } else {
      setFilteredSongs([]);
    }
  };
  return (
    <header className="homepage-header">
      <h1>TuneNest</h1>
      <nav>
        <ul>
          {location.pathname !== "/profile" && (
            <li>
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search for Songs...."
              />
            </li>
          )}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }>Log Out</Link>
            </li>
          ) : (
            <li><Link onClick={() => loginWithRedirect()}>Log In</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default NavBar;
