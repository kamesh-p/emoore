import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  InputAdornment,
  Alert,
  Link as MuiLink,
} from "@mui/material";
// import { Email, Lock } from '@mui/icons-material';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Form, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Email as EmailIcon,
  ErrorOutline as ErrorOutlineIcon,
  VpnKey as ForgotPasswordIcon,
  Lock as LockIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  PersonAdd as PersonAddIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const Login = ({ cartItems }) => {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const isLoginDisabled = !email.includes("@") || password.length < 8;
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [resetToken, setResetToken] = useState("");

  const StyledButton = styled(Button)({
    marginTop: "20px",
  });

  const StyledTextField = styled(TextField)({
    marginBottom: "10px",
  });
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const handleForgotPasswordSubmit = () => {
    // Logic to send password recovery email
    // You can implement this part based on your backend's password recovery mechanism

    // For now, let's just show a message
    toast.info("Password recovery email sent!", { position: "top-right" });
    const forgot = forgotPasswordEmail;
    console.log("eeeemm", forgot);

    fetch("http://localhost:4000/users/forgot-password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify({
        forgotemail: forgotPasswordEmail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        alert(data.status);
      });

    handleForgotPasswordClose();
  };

  const handleResetPasswordClose = () => {
    setResetPasswordOpen(false);
    setResetPasswordError("");
    setResetPasswordSuccess("");
    setNewPassword("");
    setUserId("");
    setResetToken("");
  };
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    //logic to handle the login process.

    e.preventDefault();

    //Method 1
    // axios.get("http://localhost:4000/users/")
    // .then(response =>{const responseData = response.data

    //   for (let i = 0; i< responseData.length; i++) {

    //     if (responseData[i].email === email && responseData[i].password === password) {
    //           console.log("Credentials Match")
    //           dispatch(loginSuccess(responseData));
    //           handleClose();
    //           break;
    //     }else{
    //       alert("Invalid Credentials")
    //     }
    //   }

    // // console.log(typeof(responseData[0].email));
    // }).catch(error=>{
    //   console.error('Error: ', error);
    // }

    axios
      .post("http://localhost:4000/users/login-check", {
        email: email,
        password: password,
      })
      .then((result) => {
        const resultData = result.data;

        console.log("OUTPUT: ", resultData);
        if (!email.includes("@")) {
          setError("Email should contain @");
          return;
        }

        if (password.length < 8) {
          setError("Password should contain 8 characters!");
          return;
        }

        if (resultData.message === "Login successful") {
          localStorage.setItem("jwtToken", resultData.token);

          dispatch(loginSuccess(resultData));

          handleClose();

          let rest = {};
          axios.get("http://localhost:4000/orders/").then((resdata) => {
            rest = resdata.data;
            console.log("order items", rest.length);
            // const cstore = localStorage.getItem("cartCount", rest.length);
            // dispatch(updateCartCount(cstore))
          });

          toast.success("Login successful!", { position: "top-right" });
          setPasswordVisible(false);
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        } else if (resultData === "Wrong password") {
          setError("Invalid Password");
        } else {
          console.log(resultData);
          toast.error("Invalid email", { position: "top-right" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred", { position: "top-right" });
      });

    // console.log('Email:', email);
    // console.log('Password:', password);
  };

  const handleResetPassword = (newPassword) => {
    // Send the new password and token to the server for verification and update
    axios
      .post(
        `http://localhost:4000/users/reset-password/${userId}/${resetToken}`,
        {
          password: newPassword,
        }
      )
      .then((response) => {
        setResetPasswordSuccess("Password reset successful");
        // Optionally, navigate to a success page or login page
        navigate("/login");
      })
      .catch((error) => {
        setResetPasswordError("Password reset failed");
        console.error(error);
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        sx={{ "& .MuiDialogTitle-root": { backgroundColor: "#000000" } }}
      >
        <DialogTitle sx={{ color: "#ffff" }}>Login</DialogTitle>
        <DialogContent sx={{ backgroundColor: "#818589" }}>
          {/*'#8EE4AF'**/}
          <DialogContentText
            sx={{
              marginTop: "8px",
              marginBottom: "8px",
              color: "#ffff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ErrorOutlineIcon sx={{ marginRight: "4px", color: "red" }} />
            Please enter your email and password to login.
          </DialogContentText>
          <form onSubmit={(e) => handleLogin}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <TextField
              autoFocus
              placeholder="Enter a valid email..."
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={email.length > 0 && !email.includes("@")}
              helperText={
                email.length > 0 && !email.includes("@")
                  ? "Email should contain @"
                  : ""
              }
              InputProps={{
                startAdornment: <EmailIcon />,
                style: { backgroundColor: "white" },
                endAdornment: (
                  <InputAdornment position="end">
                    {email.length > 0 && !email.includes("@") ? (
                      <IconButton disabled>
                        <CancelIcon color="error" />
                      </IconButton>
                    ) : email.length > 0 && email.includes("@") ? (
                      <IconButton disabled>
                        <CheckCircleIcon style={{ color: "green" }} />
                      </IconButton>
                    ) : null}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="dense"
              label="Password"
              placeholder="Enter the correct password!"
              type={passwordVisible ? "text" : "password"}
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              error={password.length > 0 && password.length < 8}
              helperText={
                password.length > 0 && password.length < 8
                  ? "Password should be at least 8 characters"
                  : ""
              }
              InputProps={{
                startAdornment: <LockIcon />,
                style: { backgroundColor: "white" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    {password.length > 0 && password.length < 8 ? (
                      <CancelIcon color="error" />
                    ) : password.length >= 8 ? (
                      <CheckCircleIcon
                        style={{ color: "green", margin: "9px" }}
                      />
                    ) : null}
                  </InputAdornment>
                ),
              }}
            />
          </form>
          <Button
            type="button"
            onClick={handleReset}
            color="secondary"
            style={{ color: "#301934" }}
          >
            <RefreshIcon />
            Reset
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/signup">
              <PersonAddIcon />
              <Button type="button" style={{ color: "#301934" }}>
                New user?
              </Button>
            </Link>
            <div>
              <DialogActions>
                <Button
                  type="button"
                  style={{ color: "#301934" }}
                  onClick={handleForgotPasswordOpen}
                  color="primary"
                >
                  <ForgotPasswordIcon /> Forgot Password?
                </Button>

                <Dialog
                  open={forgotPasswordOpen}
                  onClose={handleForgotPasswordClose}
                >
                  <DialogTitle>Forgot Password</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please enter your email to receive a password recovery
                      link.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Email"
                      type="email"
                      fullWidth
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    />
                  </DialogContent>

                  <DialogActions>
                    <Button
                      onClick={handleForgotPasswordSubmit}
                      color="primary"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </DialogActions>
            </div>
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#000000", // Set your desired background color here
            justifyContent: "space-between", // Adjust as needed
            alignItems: "center", // Adjust as needed
          }}
        >
          <Link to="/about">
            <Button sx={{ color: "red" }}>Cancel</Button>
          </Link>
          <Button
            type="submit"
            onClick={(e) => handleLogin(e)}
            disabled={isLoginDisabled}
            sx={{
              color: "white",
              backgroundColor: isLoginDisabled ? "#ffff" : "green",
              "&:hover": {
                backgroundColor: isLoginDisabled ? "red" : "darkgreen",
              },
            }}
            // sx={{

            //   color: isLoginDisabled ? 'white' : 'green',
            //   '&:hover': {
            //     backgroundColor: 'transparent',
            //   },
            // }}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resetPasswordOpen} onClose={handleResetPasswordClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your new password.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetPassword} color="primary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
