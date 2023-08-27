import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SellIcon from "@mui/icons-material/Sell";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HistoryTwoToneIcon from "@mui/icons-material/HistoryTwoTone";
import LoginIcon from "@mui/icons-material/Login";
import Tooltip from "@mui/material/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { toast } from "react-toastify";
import { Button, IconButton } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Header = ({ length, count }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    setTimeout(() => {
      toast.success("Redirecting to home page", { position: "top-right" });
    }, 500);

    dispatch(logout());
    navigate("/about", { replace: true });
  };
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log("username", user);
  // console.log("username12", user.Users.name);
  const name = user?.Users?.name || "viewers";
  const isAdmin = user?.Users?.Type === "Admin";
  let cartcount = length + count;
  return (
    <div>
      <header>
        <nav
          id="nav-header"
          className="navbar navbar-expand-lg navbar-light  bg-light"
        >
          <div id="container">
            <div className="Title-logo">
              <Link to="/about" className="link-logo">
                <LibraryBooksIcon /> E-Moore
              </Link>
            </div>
            <div className="nav-div-class">
              <ul className="navbar-nav mr-auto">
                {/* <li className="nav-item active">
                <Link className="nav-link" to="/Cart">
                  Cart
                </Link>
              </li> */}
                {!isAdmin && (
                  <li className="nav-item active">
                    <Link className="nav-link" to="/Buy">
                      <Tooltip title="Shop">
                        <ShoppingBagIcon />
                      </Tooltip>
                    </Link>
                  </li>
                )}
                {/* {isAdmin && (
                  <li className="nav-item active">
                    <Link className="nav-link" to="/sell-admin">
                      <Tooltip title="Shop">
                        <ShoppingBagIcon />
                      </Tooltip>
                    </Link>
                  </li>
                )} */}
                {!isAdmin && (
                  <li className="nav-item active">
                    <Link className="nav-link" to="/Sell">
                      <Tooltip title="Sell">
                        <SellIcon />
                      </Tooltip>
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li className="nav-item active">
                    <Link className="nav-link" to="/Admindetails">
                      <Tooltip title="Sell">
                        <SellIcon />
                      </Tooltip>
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li className="nav-item active">
                    <Link className="nav-link" to="/AdminUser">
                      <Tooltip title="user">
                        <ShoppingCartIcon />
                      </Tooltip>
                    </Link>
                  </li>
                )}
                {/* {!isAdmin && (
                  <li className="nav-item active">
                    <Link className="nav-link" to="/Library">
                      <Tooltip title="Library">
                        <LocalLibraryIcon />
                        <sup className="sup-length">{count}</sup>
                      </Tooltip>
                    </Link>
                  </li>
                )} */}
                {!isAdmin && (
                  <li className="nav-item active">
                    <Link className="nav-link" to="/cart">
                      <Tooltip title="Cart">
                        <ShoppingCartIcon />
                        <sup className="sup-length">{cartcount}</sup>
                      </Tooltip>
                    </Link>
                  </li>
                )}
                <DropdownButton
                  align="end"
                  title={<AccountCircleOutlinedIcon />}
                  id="dropdown-menu-align-end"
                >
                  {!isAdmin && isAuthenticated && (
                    <Dropdown.Item eventKey="4">
                      <Link className="Login-page" to="/CRhistory">
                        <HistoryTwoToneIcon />
                        History
                      </Link>
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item eventKey="4">
                    {!isAuthenticated ? (
                      <Link className="Login-page" to="/Login">
                        <LoginIcon />
                        Login/Signin
                      </Link>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={handleLogout}
                        className="btn-logout-header"
                      >
                        Logout
                      </Button>
                    )}
                  </Dropdown.Item>
                </DropdownButton>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
