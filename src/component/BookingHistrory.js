import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Table, Form } from "react-bootstrap";
import { format } from "date-fns";
import "./BookHistrory.css"; // Import your custom CSS for styling

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const isLoading = history.length === 0;

  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then((response) => response.json())
      .then((data) => {
        setHistory(data);
        setFilteredBooks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      const filtered = history.filter(
        (book) => book.user.Users.name === user.Users.name
      );
      applyDateAndTimeFilter(filtered);
      setFilteredBooks(filtered);
    }
  }, [user, history]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = history.filter((book) =>
      book.items.some((item) => item.title.toLowerCase().includes(query))
    );
    applyDateAndTimeFilter(filtered);
    setFilteredBooks(filtered);
    setSearchQuery(query);
  };

  const applyDateAndTimeFilter = (books) => {
    let filteredBooks = books;

    if (selectedDate) {
      filteredBooks = filteredBooks.filter((book) => {
        const orderDate = new Date(book.orderDate);
        const selectedDateObj = new Date(selectedDate);
        return (
          orderDate.getUTCFullYear() === selectedDateObj.getUTCFullYear() &&
          orderDate.getUTCMonth() === selectedDateObj.getUTCMonth() &&
          orderDate.getUTCDate() === selectedDateObj.getUTCDate()
        );
      });
    }

    if (selectedTime) {
      filteredBooks = filteredBooks.filter((book) => {
        const orderDate = new Date(book.orderDate);
        const orderTime = orderDate.toISOString().substr(11, 5);
        return orderTime === selectedTime;
      });
    }

    setFilteredBooks(filteredBooks);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <Container className="history-container">
      {/* <h4 className="history-heading">Order History</h4> */}
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <Form.Control
                    type="text"
                    placeholder="Search by Book Title"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </th>
                {/* <th>
                  <Form.Control
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </th> */}
                {/* <th>
                  <Form.Control
                    type="datetime-local"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </th> */}
              </tr>
              <tr>
                <th>Items</th>
                <th>Order time</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={index}>
                  <td>
                    {book.items.map((item, itemIndex) => (
                      <p key={itemIndex}>{item.title}</p>
                    ))}
                  </td>
                  <td>{new Date(book.orderDate).toLocaleString()}</td>
                  <td>{book.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default BookingHistory;
