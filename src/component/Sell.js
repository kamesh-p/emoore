import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import { Link } from "react-router-dom";

function Sell() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [classification, setClassification] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    description: "",
    classification: "",
    price: "",
    langage: "",
    education: "",
    Genre: "",
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleConfirmDialogOpen = () => {
    if (validateForm()) {
      setConfirmDialogOpen(true);
    } else {
      toast.error("All fields are mandatory...", {
        autoClose: 1000,
        position: "top-right",
      });
    }
    if (validateForm()) {
      if ((education && Genre) || (!education && !Genre)) {
        // Display warning toast message when both fields are entered or both fields are empty
        toast.warning("Please choose either Education or Genre, not both.", {
          autoClose: 1000,
          position: "top-right",
        });
      } else {
        setConfirmDialogOpen(true);
      }
    } else {
      toast.error("All fields are mandatory...", {
        autoClose: 1000,
      });
    }
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };
  const [selectedClassification, setSelectedClassification] = useState("");
  const [langage, setSelectedlangClassification] = useState("");
  const [education, setSelectededucationClassification] = useState("");
  const [Genre, setSelectedgenreClassification] = useState("");
  const [educationEnabled, setEducationEnabled] = useState(true);
  const [genreEnabled, setGenreEnabled] = useState(true);
  const [instructionsDialogOpen, setInstructionsDialogOpen] = useState(true);
  const [sellComponentVisible, setSellComponentVisible] = useState(false);

  // const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const handleInstructionsDialogClose = () => {
    setInstructionsDialogOpen(false);
    setSellComponentVisible(true);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title) newErrors.title = "Title is required";
    if (!author) newErrors.author = "Author is required";
    if (!description) newErrors.description = "Description is required";
    if (!selectedClassification)
      newErrors.selectedClassification = "Classification is required";
    if (!price) newErrors.price = "Price is required";
    else if (isNaN(price) || parseFloat(price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (selectedClassification === "Education") {
      if (!education && !Genre) {
        newErrors.Genre = "Genre is required when Classification is Education";
      }
    } else if (selectedClassification === "Genre") {
      if (!Genre && !education) {
        newErrors.education =
          "Education is required when Classification is Genre";
      }
    } else {
      if (!education) newErrors.education = "Education is required";
      if (!Genre) newErrors.Genre = "Genre is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    clearError("title");
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
    clearError("author");
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    clearError("description");
  };

  const handleClassificationChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedClassification(selectedValue);

    // Enable/disable fields based on the selected classification
    if (selectedValue === "Education") {
      setEducationEnabled(true);
      setGenreEnabled(false);
    } else if (selectedValue === "Genre") {
      setEducationEnabled(false);
      setGenreEnabled(true);
    } else {
      setEducationEnabled(true);
      setGenreEnabled(true);
    }

    clearError("classification");
  };
  const handleLangeClassificationChange = (event) => {
    const selectedValuelang = event.target.value;
    setSelectedlangClassification(selectedValuelang);
    // setSelectedSubcategory(""); // Reset subcategory when classification changes
    clearError("Language");
  };
  const handleEductionClassificationChange = (event) => {
    const selectedValueeducation = event.target.value;
    setSelectededucationClassification(selectedValueeducation);
    // setSelectedSubcategory(""); // Reset subcategory when classification changes
    clearError("Education");
  };
  const handlegenreClassificationChange = (event) => {
    const selectedValueeducation = event.target.value;
    setSelectedgenreClassification(selectedValueeducation);
    // setSelectedSubcategory(""); // Reset subcategory when classification changes
    clearError("Genre");
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    clearError("price");
  };

  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const sellingData = {
      user: user,
      author: author,
      title: title,
      description: description,
      price: price,
      classification: selectedClassification,
      Education: education,
      Genre: Genre,
      language: langage,
    };

    try {
      await axios.post(
        "http://localhost:4000/selling/create-user",
        sellingData
      );
      console.log("Selling data sent successfully!");
    } catch (error) {
      console.error("Error sending selling data:", error);
    }
    toast.success("Book posted successfully...", {
      autoClose: 1000,
      position: "top-right",
    });
    setTitle("");
    setPrice("");
    setDescription("");
    setAuthor("");
    setSelectedClassification("");
    setSelectedlangClassification("");
    setSelectededucationClassification("");
    setSelectedgenreClassification("");
    handleConfirmDialogClose();
  };
  const handleformformat = (event) => {
    event.preventDefault();
  };
  console.log("class", selectedClassification);
  console.log("classedu", education);
  console.log("classLAN", langage);
  console.log("classgenere", Genre);
  // const classificationOptions = [
  //   { value: "fiction", label: "Fiction" },
  //   { value: "non-fiction", label: "Non-Fiction" },
  //   { value: "education", label: "Education" },
  // ];

  // const educationSubcategoryOptions = [
  //   { value: "medical", label: "Medical" },
  //   { value: "engineering", label: "Engineering" },
  // ];

  // const genreOptions = [
  //   { value: "fantasy", label: "Fantasy" },
  //   { value: "mystery", label: "Mystery" },
  //   { value: "science-fiction", label: "Science Fiction" },
  // ];

  return (
    <div>
      {instructionsDialogOpen && (
        <Dialog
          open={instructionsDialogOpen}
          onClose={handleInstructionsDialogClose}
        >
          <Container style={{ marginTop: "50px" }}>
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                textAlign: "center",
                background: "#F6635C",
              }}
            >
              <h2>Instructions</h2>

              <ul
                style={{
                  textAlign: "left",
                  margin: "10px 0",
                  paddingLeft: "20px",

                  fontWeight: "bolder",
                }}
              >
                <li>
                  Start by providing accurate details about your book.
                  <ul>
                    <li>
                      Select the book's language from available options such as
                      English, Tamil, Hindi, and French.
                    </li>

                    <li>
                      Choose the appropriate category for your book, including
                      educational (engineering, medicine), fiction, or
                      non-fiction.
                    </li>
                  </ul>
                </li>

                <li>
                  Prepare to sell your book by filling out the form accurately.
                </li>

                <li>
                  Fill in your book's title, author, description,
                  classification, and price in the form.
                </li>

                <li>Write a clear and captivating description of your book.</li>

                <li>
                  Include high-quality images of your book's cover and any
                  relevant pages.
                </li>

                <li>
                  After entering the details, click the "Post Book" button to
                  proceed with listing your book for sale.
                </li>

                <li>
                  A confirmation dialog will appear; make sure to confirm your
                  action to proceed with selling your book.
                </li>

                <li>
                  Our team will review your listing and reach out to you. Thank
                  you for using the Book Selling Portal!
                </li>
              </ul>
            </Paper>
          </Container>
          <DialogActions>
            <Button
              onClick={handleInstructionsDialogClose}
              variant="outlined"
              color="error"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Container>
        <Paper
          elevation={3}
          className="selling-page"
          style={{
            width: "50%",
            padding: "20px",
            margin: "100px 300px",
            maxHeight: "calc(100vh - 150px)", // Adjust the value to fit your layout
            overflowY: "auto",
          }}
        >
          <h2>Sell your Book</h2>

          <form className="form-field" onSubmit={handleformformat}>
            <TextField
              label="Title"
              value={title}
              error={!!errors.title}
              helperText={errors.title}
              style={{ width: "100%", marginTop: "10px" }}
              onChange={handleTitleChange}
              margin="normal"
            />

            <TextField
              label="Author"
              style={{ width: "100%", marginTop: "10px" }}
              value={author}
              error={!!errors.author}
              helperText={errors.author}
              onChange={handleAuthorChange}
              onKeyPress={(event) => {
                if (/\d/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              margin="normal"
            />

            <TextField
              rows={3} // Minimum number of rows
              rowsMax={10}
              label="Description"
              style={{ width: "100%", marginTop: "10px" }}
              value={description}
              error={!!errors.description}
              multiline
              helperText={errors.description}
              onChange={handleDescriptionChange}
              onKeyPress={(event) => {
                if (/\d/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <FormControl sx={{ width: "540px" }}>
              <InputLabel id="classification-label">Classification</InputLabel>
              <Select
                labelId="classification-label"
                id="classification"
                value={selectedClassification}
                error={!!errors.classification}
                onChange={handleClassificationChange}
                style={{ width: "100%", marginTop: "10px" }}
                label="Classification"
                margin="normal"
              >
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Genre">Genre</MenuItem>
                <MenuItem value="Language">Language</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "540px" }}>
              <InputLabel id="classification-label">Education</InputLabel>
              <Select
                labelId="classification-label"
                id="classification"
                value={education}
                disabled={!educationEnabled} // Disable the field based on the state
                // error={!!errors.classification}
                onChange={handleEductionClassificationChange}
                style={{ width: "100%", marginTop: "10px" }}
                label="Education"
                margin="normal"
              >
                <MenuItem value="Medical">Medical</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="">none</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "540px" }}>
              <InputLabel id="classification-label">Language</InputLabel>
              <Select
                labelId="classification-label"
                id="classification"
                value={langage}
                error={!!errors.classification}
                onChange={handleLangeClassificationChange}
                style={{ width: "100%", marginTop: "10px" }}
                label="Language"
                margin="normal"
              >
                <MenuItem value="Tamil">Tamil</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="">none</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "540px" }}>
              <InputLabel id="classification-label">Genre</InputLabel>
              <Select
                labelId="classification-label"
                id="classification"
                value={Genre}
                disabled={!genreEnabled} // Disable the field based on the state
                error={!!errors.classification}
                onChange={handlegenreClassificationChange}
                style={{ width: "100%", marginTop: "10px" }}
                label="Genre"
                margin="normal"
              >
                <MenuItem value="fiction">Fiction</MenuItem>
                <MenuItem value="Non-fiction">Non-Fiction</MenuItem>
                <MenuItem value="">none</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Price in Rs."
              type="number"
              style={{ width: "100%", marginTop: "10px" }}
              value={price}
              error={!!errors.price}
              helperText={errors.price}
              onChange={handlePriceChange}
              margin="normal"
            />

            {isAuthenticated ? (
              <Button
                type="submit"
                variant="contained"
                color="error"
                onClick={handleConfirmDialogOpen}
              >
                Place Order
              </Button>
            ) : (
              // If user is not authenticated, show "Login" link
              <div>
                <p>You need to log in to place an order.</p>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="error">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </form>
        </Paper>

        <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to sell your book? Our team will examine it
              and reach out to you.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleConfirmDialogClose}
              variant="outlined"
              color="error"
            >
              Close
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="success">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default Sell;
