import React from "react";
import { NavLink } from "react-router-dom";
import { AccessTokenProvider } from "../components/AccessTokenProvider";

function NavBar() {
  const isLoggedIn = AccessTokenProvider.getAccessToken() !== null;
  const userRole = AccessTokenProvider.getUserRole();

  console.log('isLoggedIn:', isLoggedIn);
  console.log('userRole:', userRole);

  const links = [
    { id: 1, path: "/", text: "Home", show: true },
    { id: 2, path: "/courses", text: "Courses", show: isLoggedIn },
    {
      id: 4,
      path: "/login",
      text: isLoggedIn ? "Logout" : "Login",
      show: true,
    },
    {
      id: 5,
      path: "/create-course",
      text: "Create Course",
      show: userRole && userRole.includes("ADMIN") && isLoggedIn,
    },
    { id: 6, path: "/chat", text: "Chat", show: isLoggedIn },
  ];

  return (
    <div>
      <div className="header">
        <br />
        <br />
        <br />
      </div>
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
            {links.map(
              (link) =>
                link.show && (
                  <li key={link.id} className="nav-item">
                    <NavLink className="nav-link" to={link.path}>
                      {link.text}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </div>
        <a href="/profile" className={`ml-auto text-light ${isLoggedIn ? "" : "d-none"}`}>
          Profile
        </a>
      </nav>
    </div>
  );
}

export default NavBar;
