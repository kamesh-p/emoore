import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
} from "@mui/material";

const Buyuserdetails = ({ userOrder }) => {
  return (
    <div style={{ margin: "50px 0px" }}>
      {/* <h2>Ordered Books</h2> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>Address</TableCell>

              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userOrder.map((order) => (
              <React.Fragment key={order._id}>
                <TableRow>
                  <TableCell rowSpan={order.items.length + 1}>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
                <TableCell rowSpan={order.items.length + 1}>
                  {order.paymentType}
                </TableCell>
                <TableCell rowSpan={order.items.length + 1}>
                  {order.address}
                </TableCell>
                {order.items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.author}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Buyuserdetails;
