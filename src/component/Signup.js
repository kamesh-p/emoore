import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import { AccountCircle, Email, Lock } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import axios from "axios";

import { fontWeight, styled } from "@mui/system";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ffff",
});

const StyledForm = styled("form")({
  width: "80%",
  marginLeft: "30px",
  marginTop: "80px",
  maxWidth: "500px",
  padding: "20px",
  backgroundColor: "#111111",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const StyledTextField = styled(TextField)({
  marginBottom: "15px",
  backgroundColor: "#ffff",
});

const StyledButton = styled(Button)({
  marginTop: "10px",
});

const SignupPage = () => {
  const [step, setStep] = useState(1);
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
    setSelectedLanguages((prevSelected) =>
      prevSelected.includes(selectedLanguage)
        ? prevSelected.filter((lang) => lang !== selectedLanguage)
        : prevSelected.length < MAX_SELECTED_LANGUAGES
        ? [...prevSelected, selectedLanguage]
        : prevSelected
    );
  };

  const handleEduChange = (event) => {
    setSelectedEducation(event.target.value);
  };

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.name;
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(selectedGenre)
        ? prevSelected.filter((genre) => genre !== selectedGenre)
        : prevSelected.length < MAX_SELECTED_GENRES
        ? [...prevSelected, selectedGenre]
        : prevSelected
    );
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
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

    if (password.length < 8) {
      toast.error("Password needs to be at least 8 characters", {
        position: "top-center",
      });
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
      SellProduct: 0,
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
          setSelectedLanguages([]);
          setSelectedEducation("");
          setSelectedGenres([]);
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
      <div style={{ height: "100vh", overflowY: "auto" }}>
        {step === 1 && (
          <StyledForm onSubmit={handleNextStep}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "red", fontWeight: "800" }}
            >
              Personal Information
            </Typography>
            {/* Step 1 form content */}
            {/* ... (name, email, password, confirmPassword) */}
            {error && <Alert severity="error">{error}</Alert>}

            {success && <Alert severity="success">{success}</Alert>}
            {/* <div className="signup-full-container-input-prefrenece"> */}
            <div>
              <StyledTextField
                label="Name"
                sx={{
                  "& label": {
                    color: "pink",
                    fontWeight: "800",
                  },

                  "& input::placeholder": {
                    color: "#000000",
                    fontWeight: "800",
                  },
                }}
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <AccountCircle />,
                }}
              />

              <StyledTextField
                sx={{
                  "& label": {
                    color: "pink",
                    fontWeight: "800",
                  },

                  "& input::placeholder": {
                    color: "#000000",
                    fontWeight: "800",
                  },
                }}
                label="Email ID"
                placeholder="Enter a valid email id!!"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <Email />,
                }}
              />

              <StyledTextField
                sx={{
                  "& label": {
                    color: "pink", // Set the label color to red
                    fontWeight: "800",
                  },

                  "& input::placeholder": {
                    color: "#000000", // Set the placeholder color to black
                    fontWeight: "800", // Set the placeholder font weight to 600
                  },
                }}
                label="Password"
                type="password"
                placeholder="Enter the correct password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <Lock />,
                }}
              />

              <StyledTextField
                sx={{
                  "& label": {
                    color: "pink", // Set the label color to red
                    fontWeight: "800",
                  },

                  "& input::placeholder": {
                    color: "#000000", // Set the placeholder color to black
                    fontWeight: "800", // Set the placeholder font weight to 600
                  },
                }}
                label="Confirm Password"
                type="password"
                placeholder="Retype the correct password.."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <Lock />,
                }}
              />
            </div>

            <StyledButton type="submit" variant="contained" color="primary">
              Next
            </StyledButton>
          </StyledForm>
        )}
        {step === 2 && (
          <StyledForm onSubmit={handleNextStep}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "red", fontWeight: "800" }}
            >
              Preferences
            </Typography>
            {/* Step 2 form content */}
            {/* ... (selectedLanguages, selectedGenres, selectedEducation) */}

            <div>
              <div className="form-section">
                <Typography variant="h5" gutterBottom sx={{ color: "#ffff" }}>
                  Language
                </Typography>

                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ color: "#ffff" }}
                        checked={selectedLanguages.includes("Eng")}
                        onChange={handleLanguageChange}
                        name="Eng"
                      />
                    }
                    label="Eng"
                    sx={{ color: "#ffff" }}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ color: "#ffff" }}
                        checked={selectedLanguages.includes("Tamil")}
                        onChange={handleLanguageChange}
                        name="Tamil"
                      />
                    }
                    label="Tamil"
                    sx={{ color: "#ffff" }}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ color: "#ffff" }}
                        checked={selectedLanguages.includes("Hindi")}
                        onChange={handleLanguageChange}
                        name="Hindi"
                      />
                    }
                    label="Hindi"
                    sx={{ color: "#ffff" }}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ color: "#ffff" }}
                        checked={selectedLanguages.includes("French")}
                        onChange={handleLanguageChange}
                        name="French"
                      />
                    }
                    label="French"
                    sx={{ color: "#ffff" }}
                  />
                </FormControl>
              </div>

              <div className="form-section">
                <Typography variant="h5" gutterBottom sx={{ color: "#ffff" }}>
                  Genre
                </Typography>

                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ color: "#ffff" }}
                        checked={selectedGenres.includes("fiction")}
                        onChange={handleGenreChange}
                        name="fiction"
                      />
                    }
                    label="fiction"
                    sx={{ color: "#ffff" }}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ color: "#ffff" }}
                        checked={selectedGenres.includes("Thriller")}
                        onChange={handleGenreChange}
                        name="Thriller"
                      />
                    }
                    label="Thriller"
                    sx={{ color: "#ffff" }}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ color: "#ffff" }}
                        checked={selectedGenres.includes("Sci-Fic")}
                        onChange={handleGenreChange}
                        name="Sci-Fic"
                      />
                    }
                    label="Sci-Fic"
                    sx={{ color: "#ffff" }}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ color: "#ffff" }}
                        checked={selectedGenres.includes("Romance")}
                        onChange={handleGenreChange}
                        name="Romance"
                      />
                    }
                    label="Romance"
                    sx={{ color: "#ffff" }}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ color: "#ffff" }}
                        checked={selectedGenres.includes("Non-fictional")}
                        onChange={handleGenreChange}
                        name="Non-fictional"
                      />
                    }
                    label="Non-fictional"
                    sx={{ color: "#ffff" }}
                  />
                </FormControl>
              </div>

              <div className="form-section">
                <Typography variant="h5" gutterBottom sx={{ color: "#ffff" }}>
                  Education
                </Typography>

                <FormControl>
                  <RadioGroup
                    sx={{ color: "#ffff" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={handleEduChange}
                  >
                    <FormControlLabel
                      sx={{ color: "#ffff" }}
                      value="Engineering"
                      control={<Radio sx={{ color: "#ffff" }} />}
                      label="Engineering"
                    />

                    <FormControlLabel
                      value="Medicine"
                      control={<Radio sx={{ color: "#ffff" }} />}
                      label="Medicine"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <StyledButton onClick={handlePreviousStep}>Previous</StyledButton>
            <StyledButton type="submit" variant="contained" color="primary">
              Next
            </StyledButton>
          </StyledForm>
        )}
        {step === 3 && (
          <StyledForm onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "red", fontWeight: "800" }}
            >
              Confirm Details
            </Typography>
            {/* Step 3 form content */}
            {/* ... (displaying entered details) */}
            <StyledButton onClick={handlePreviousStep}>Previous</StyledButton>
            <StyledButton type="submit" variant="contained" color="primary">
              Sign Up
            </StyledButton>
          </StyledForm>
        )}
      </div>
    </StyledContainer>
  );
};

export default SignupPage;

// const handleLanguageChange = (event) => {
//   const selectedLanguage = event.target.name;

//   if (selectedLanguages.includes(selectedLanguage)) {
//     setSelectedLanguages((prevSelected) =>
//       prevSelected.filter((lang) => lang !== selectedLanguage)
//     );
//   } else if (selectedLanguages.length < MAX_SELECTED_LANGUAGES) {
//     setSelectedLanguages((prevSelected) => [
//       ...prevSelected,

//       selectedLanguage,
//     ]);
//   }
// };

// const handleGenreChange = (event) => {
//   const selectedGenre = event.target.name;

//   if (selectedGenres.includes(selectedGenre)) {
//     setSelectedGenres((prevSelected) =>
//       prevSelected.filter((genre) => genre !== selectedGenre)
//     );
//   } else if (selectedGenres.length < MAX_SELECTED_GENRES) {
//     setSelectedGenres((prevSelected) => [...prevSelected, selectedGenre]);
//   }
// };

//   const handleFormatChange = (event) => {
//     setSelectedFormat(event.target.value);
//   };

// const handleEduChange = (event) => {
//   setSelectedEducation(event.target.value);
// };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords do not match. Please try again.");
//       return;
//     }

//     if (!name || !email || !password || !confirmPassword) {
//       toast.error("All fields are mandatory!!", { position: "top-right" });

//       return;
//     }

//     if(password.length<8){
//       toast.error("Password needs be at least 8 characters", {position: "top-center"})
//       return;
//     }

//     const userObject = {
//       name: name,
//       email: email,
//       password: password,
//       language: selectedLanguages,
//       Type: "user",
//       genre: selectedGenres,
//       education: selectedEducation,
//       RentedSub: false,
//       SellProduct:0
//     };

//     axios

//       .post("http://localhost:4000/users/create-user", userObject)

//       .then((response) => {
//         const resultdata = response.data.error;

//         if (resultdata === "Duplicate email") {
//           setError("User already exists. Please log in.");

//           setEmail("");

//           return;
//         } else {
//           setName("");
//           setEmail("");
//           setPassword("");
//           setConfirmPassword("");
//           setError("");
//           setSelectedLanguages("");
//           setSelectedEducation("");
//           setSelectedGenres("");
//           setSuccess("User registered successfully!");

//           setTimeout(() => {
//             navigate("/login", { replace: true });
//           }, 3000);
//         }

//         console.log(resultdata);
//       })

//       .catch((error) => {
//         if (error.response && error.response.status === 409) {
//           setError("User already exists. Please log in.");
//         } else {
//           setError("An error occurred. Please try again later.");
//         }
//       });
//   };

//   return (
//     <StyledContainer>
//        <div style={{ height: "100vh", overflowY: "auto" }}>
//       <StyledForm onSubmit={handleSubmit}>
//         <Typography variant="h4" gutterBottom sx={{ color: '#ffff' }}>
//           Sign Up
//         </Typography>

// {error && <Alert severity="error">{error}</Alert>}

// {success && <Alert severity="success">{success}</Alert>}
// <div className="signup-full-container-input-prefrenece">
//   <div>
//     <StyledTextField
//       label="Name"
//       type="text"
//       value={name}
//       onChange={(e) => setName(e.target.value)}
//       fullWidth
//       InputProps={{
//         startAdornment: <AccountCircle />,
//       }}
//     />

//     <StyledTextField
//       label="Email ID"
//       type="email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       fullWidth
//       InputProps={{
//         startAdornment: <Email />,
//       }}
//     />

//     <StyledTextField
//       label="Password"
//       type="password"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//       fullWidth
//       InputProps={{
//         startAdornment: <Lock />,
//       }}
//     />

//     <StyledTextField
//       label="Confirm Password"
//       type="password"
//       value={confirmPassword}
//       onChange={(e) => setConfirmPassword(e.target.value)}
//       fullWidth
//       InputProps={{
//         startAdornment: <Lock />,
//       }}
//     />
//   </div>
//   <div>
//     <div className="form-section">
//       <Typography variant="h5" gutterBottom sx={{ color: '#ffff' }}>
//         Language
//       </Typography>

//       <FormControl>
//         <FormControlLabel
//           control={
//             <Checkbox
//             sx={{ color: '#ffff' }}
//               checked={selectedLanguages.includes("Eng")}
//               onChange={handleLanguageChange}
//               name="Eng"
//             />
//           }
//           label="Eng"
//           sx={{ color: '#ffff' }}
//         />
//       </FormControl>

//       <FormControl>
//         <FormControlLabel
//           control={
//             <Checkbox
//             sx={{ color: '#ffff' }}
//               checked={selectedLanguages.includes("Tamil")}
//               onChange={handleLanguageChange}
//               name="Tamil"
//             />
//           }
//           label="Tamil"
//           sx={{ color: '#ffff' }}
//         />
//       </FormControl>

//       <FormControl>
//         <FormControlLabel
//           control={
//             <Checkbox
//               sx={{ color: '#ffff' }}
//               checked={selectedLanguages.includes("Hindi")}
//               onChange={handleLanguageChange}
//               name="Hindi"
//             />
//           }
//           label="Hindi"
//           sx={{ color: '#ffff' }}
//         />
//       </FormControl>

//       <FormControl>
//         <FormControlLabel
//           control={
//             <Checkbox
//               sx={{ color: '#ffff' }}
//               checked={selectedLanguages.includes("French")}
//               onChange={handleLanguageChange}
//               name="French"
//             />
//           }
//           label="French"
//           sx={{ color: '#ffff' }}
//         />
//       </FormControl>
//     </div>

//     <div className="form-section">
//       <Typography variant="h5" gutterBottom sx={{ color: '#ffff' }}>
//         Genre
//       </Typography>

//       <FormControl>
//         <FormControlLabel
//           control={
//             <Checkbox
//             sx={{ color: '#ffff' }}
//               checked={selectedGenres.includes("fiction")}
//               onChange={handleGenreChange}
//               name="fiction"
//             />
//           }
//           label="fiction"
//           sx={{ color: '#ffff' }}
//         />
//       </FormControl>

//       <FormControl>
//         <FormControlLabel
//           control={
//             <Checkbox
//             sx={{ color: '#ffff' }}
//               checked={selectedGenres.includes("Thriller")}
//               onChange={handleGenreChange}
//               name="Thriller"
//             />
//           }
//           label="Thriller"
//           sx={{ color: '#ffff' }}
//         />
//       </FormControl>

//       <FormControl>
//         <FormControlLabel
//           control={
//             <Checkbox
//             sx={{ color: '#ffff' }}
//               checked={selectedGenres.includes("Sci-Fic")}
//               onChange={handleGenreChange}
//               name="Sci-Fic"
//             />
//           }
//           label="Sci-Fic"
//           sx={{ color: '#ffff' }}
//         />
//       </FormControl>

//       <FormControl>
//         <FormControlLabel
//           control={
//             <Checkbox
//             sx={{ color: '#ffff' }}
//               checked={selectedGenres.includes("Romance")}
//               onChange={handleGenreChange}
//               name="Romance"
//             />
//           }
//           label="Romance"
//           sx={{ color: '#ffff' }}
//         />
//       </FormControl>

//       <FormControl>
//         <FormControlLabel
//           control={
//             <Checkbox
//               sx={{ color: '#ffff' }}
//               checked={selectedGenres.includes("Non-fictional")}
//               onChange={handleGenreChange}
//               name="Non-fictional"
//             />
//           }
//           label="Non-fictional"
//           sx={{ color: '#ffff' }}
//         />
//       </FormControl>
//     </div>

//     <div className="form-section">
//       <Typography variant="h5" gutterBottom sx={{ color: '#ffff' }}>
//         Education
//       </Typography>

//       <FormControl>
//         <RadioGroup
//            sx={{ color: '#ffff' }}
//           aria-labelledby="demo-radio-buttons-group-label"
//           name="radio-buttons-group"
//           onChange={handleEduChange}
//         >
//           <FormControlLabel
//           sx={{ color: '#ffff' }}
//             value="Engineering"
//             control={<Radio
//               sx={{ color: '#ffff' }}
//             />}
//             label="Engineering"
//           />

//           <FormControlLabel

//             value="Medicine"
//             control={<Radio
//               sx={{ color: '#ffff' }}
//             />}
//             label="Medicine"
//           />
//         </RadioGroup>
//       </FormControl>
//     </div>
//   </div>
// </div>
//     <StyledButton
//       type="submit"
//       variant="contained"
//       color="primary"
//       fullWidth
//     >
//       Sign Up
//     </StyledButton>
//   </StyledForm>
//   </div>
// </StyledContainer>
//   );
// };

// export default SignupPage;
