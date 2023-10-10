import React from "react";
import { NavLink } from "react-router-dom"

function NavBar() {
  
  //define navigation links
  const links = [
    { id: 1, path: "/", text: "Home" },
    { id: 2, path: "/courses", text: "Courses" },
    { id: 3, path: "/schedule", text: "Schedule" },
    { id: 4, path: "/login", text: "Login" },
  ];

  return (
    <div>
      {/* Sticky header */}
      <div className="header">
      <br />
      <br />
      <br />
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="/">
          LMS
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {links.map((link) => (
              <li key={link.id} className="nav-item">
                <NavLink className="nav-link" to={link.path}>
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <a href="#" className="ml-auto text-light">
          Profile
        </a>
      </nav>
    </div>
  );
}

export default NavBar;
