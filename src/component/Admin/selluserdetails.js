import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Selluserdetails = ({ userSelling }) => {
  return (
    <div style={{ margin: "50px 0px" }}>
      {/* <h2>Books Sold by</h2> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Classification</TableCell>
              <TableCell>Education</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userSelling.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.classification}</TableCell>
                <TableCell>{item.Education}</TableCell>
                <TableCell>{item.Genre}</TableCell>
                <TableCell>{item.language}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Selluserdetails;
