import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import "./Adminuser.css";
const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState(""); // State to hold the search input value

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.filter((user) => user.Type === "user")))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <div className="input-texxt-field">
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          // fullWidth
          margin="dense"
        />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Education</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>RentedSub</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user._id} component={Link} to={`/user/${user._id}`}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.education}</TableCell>
              <TableCell>{user.Type}</TableCell>
              <TableCell>{user.genre[0]}</TableCell>
              <TableCell>{user.language[0]}</TableCell>
              <TableCell>
                {user.RentedSub ? <CheckIcon /> : <ClearIcon />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUser;
