import { NavLink } from "react-router-dom";
import Modes from "./Modes";
// import Modes from "./Modes";
import "../style/navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const currentUser = useSelector((state) => state.userRecords.currentUser);
  return (
    <>
      <nav>
        <ul className="nav-container">
          {currentUser.length > 0 ? (
            <>
              <li>
                <NavLink className="nav-links nav-link-ltr" to="/home">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-links nav-link-ltr" to="/Logout">
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="nav-links nav-link-ltr" to="/Login">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Modes />
    </>
  );
};

export default Navbar;
