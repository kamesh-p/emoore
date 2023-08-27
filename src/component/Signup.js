import React, { useState } from "react";

import { useSelector } from "react-redux";

import { TextField, Button, Container, Typography, Alert } from "@mui/material";

// import { AccountCircle, Email, Lock } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import axios from "axios";

import { styled } from "@mui/system";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const StyledContainer = styled("div")({
  display: "flex",

  flexDirection: "column",

  alignItems: "center",

  justifyContent: "center",

  minHeight: "100vh",

  backgroundColor: "#f7f7f7",
});

const StyledForm = styled("form")({
  width: "50%",

  maxWidth: "500px",

  padding: "20px",

  backgroundColor: "#ffffff",

  borderRadius: "8px",

  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const StyledTextField = styled(TextField)({
  marginBottom: "15px",

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc",
    },

    "&:hover fieldset": {
      borderColor: "#aaa",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#007bff",
    },
  },
});

const StyledButton = styled(Button)({
  marginTop: "20px",
});

const SignupPage = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const [selectedLanguages, setSelectedLanguages] = useState("");

  const [selectedGenres, setSelectedGenres] = useState("");

  const [selectedEducation, setSelectedEducation] = useState("");

  const [selectedFormat, setSelectedFormat] = useState("");

  const [showGenre, setShowGenre] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const MAX_SELECTED_LANGUAGES = 1;

  const MAX_SELECTED_GENRES = 1;

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.name;

    if (selectedLanguages.includes(selectedLanguage)) {
      setSelectedLanguages((prevSelected) =>
        prevSelected.filter((lang) => lang !== selectedLanguage)
      );
    } else if (selectedLanguages.length < MAX_SELECTED_LANGUAGES) {
      setSelectedLanguages((prevSelected) => [
        ...prevSelected,

        selectedLanguage,
      ]);
    }
  };

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.name;

    if (selectedGenres.includes(selectedGenre)) {
      setSelectedGenres((prevSelected) =>
        prevSelected.filter((genre) => genre !== selectedGenre)
      );
    } else if (selectedGenres.length < MAX_SELECTED_GENRES) {
      setSelectedGenres((prevSelected) => [...prevSelected, selectedGenre]);
    }
  };

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleEduChange = (event) => {
    setSelectedEducation(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");

      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are mandatory!!", { position: "top-right" });

      return;
    }

    const userObject = {
      name: name,

      email: email,

      password: password,
      language: selectedLanguages,
      Type: "user",
      genre: selectedGenres,

      education: selectedEducation,

      RentedSub: false,
    };

    axios

      .post("http://localhost:4000/users/create-user", userObject)

      .then((response) => {
        const resultdata = response.data.error;

        if (resultdata === "Duplicate email") {
          setError("User already exists. Please log in.");

          setEmail("");

          return;
        } else {
          setName("");

          setEmail("");

          setPassword("");

          setConfirmPassword("");

          setError("");
          setSelectedLanguages("");
          setSelectedEducation("");
          setSelectedGenres("");
          setSuccess("User registered successfully!");

          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 3000);
        }

        console.log(resultdata);
      })

      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setError("User already exists. Please log in.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {success && <Alert severity="success">{success}</Alert>}
        <div className="signup-full-container-input-prefrenece">
          <div>
            <StyledTextField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              // InputProps={{
              //   startAdornment: <AccountCircle />,
              // }}
            />

            <StyledTextField
              label="Email ID"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              // InputProps={{
              //   startAdornment: <Email />,
              // }}
            />

            <StyledTextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              // InputProps={{
              //   startAdornment: <Lock />,
              // }}
            />

            <StyledTextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              // InputProps={{
              //   startAdornment: <Lock />,
              // }}
            />
          </div>
          <div>
            <div className="form-section">
              <Typography variant="h5" gutterBottom>
                Language
              </Typography>

              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedLanguages.includes("Eng")}
                      onChange={handleLanguageChange}
                      name="Eng"
                    />
                  }
                  label="Eng"
                />
              </FormControl>

              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedLanguages.includes("Tamil")}
                      onChange={handleLanguageChange}
                      name="Tamil"
                    />
                  }
                  label="Tamil"
                />
              </FormControl>

              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedLanguages.includes("Hindi")}
                      onChange={handleLanguageChange}
                      name="Hindi"
                    />
                  }
                  label="Hindi"
                />
              </FormControl>

              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedLanguages.includes("French")}
                      onChange={handleLanguageChange}
                      name="French"
                    />
                  }
                  label="French"
                />
              </FormControl>
            </div>

            <div className="form-section">
              <Typography variant="h5" gutterBottom>
                Genre
              </Typography>

              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedGenres.includes("fiction")}
                      onChange={handleGenreChange}
                      name="fiction"
                    />
                  }
                  label="fiction"
                />
              </FormControl>

              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedGenres.includes("Thriller")}
                      onChange={handleGenreChange}
                      name="Thriller"
                    />
                  }
                  label="Thriller"
                />
              </FormControl>

              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedGenres.includes("Sci-Fic")}
                      onChange={handleGenreChange}
                      name="Sci-Fic"
                    />
                  }
                  label="Sci-Fic"
                />
              </FormControl>

              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedGenres.includes("Romance")}
                      onChange={handleGenreChange}
                      name="Romance"
                    />
                  }
                  label="Romance"
                />
              </FormControl>

              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedGenres.includes("Non-fictional")}
                      onChange={handleGenreChange}
                      name="Non-fictional"
                    />
                  }
                  label="Non-fictional"
                />
              </FormControl>
            </div>

            <div className="form-section">
              <Typography variant="h5" gutterBottom>
                Education
              </Typography>

              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={handleEduChange}
                >
                  <FormControlLabel
                    value="Engineering"
                    control={<Radio />}
                    label="Engineering"
                  />

                  <FormControlLabel
                    value="Medicine"
                    control={<Radio />}
                    label="Medicine"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Sign Up
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default SignupPage;
