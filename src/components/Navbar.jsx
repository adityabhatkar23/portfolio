import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="shadow-2xs shadow-neutral-800 flex items-center justify-between bg-neutral-950 px-3 font-semibold min-w-56 py-1 rounded-xl font-jetbrains-mono tracking-tighter">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? "active nav" : "nav")}
      >
        Home
      </NavLink>
      <NavLink
        to="/projects"
        className={({ isActive }) => (isActive ? "active nav" : "nav")}
      >
        Projects
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "active nav" : "nav")}
      >
        Contact
      </NavLink>
    </nav>
  );
};

export default Navbar;
