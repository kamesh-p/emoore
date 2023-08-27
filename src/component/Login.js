import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

// import { Email, Lock } from '@mui/icons-material';

// import LockOpenIcon from '@mui/icons-material/LockOpen';

import { Form, Link } from "react-router-dom";

import axios from "axios";

import { useDispatch } from "react-redux";

import { loginSuccess } from "../store/authSlice";

const Login = () => {
  const [open, setOpen] = useState(true);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(false);

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

    // })

    axios
      .post("http://localhost:4000/users/login-check", {
        email: email,
        password: password,
      })

      .then((result) => {
        const resultData = result.data;

        // if(result.status==="Success"){

        //    console.log("Great work")

        // }

        console.log(resultData);
        console.log("name", resultData.Users);
        console.log("name__", resultData.Users.name);

        if (resultData.message === "Login successful") {
          dispatch(loginSuccess(resultData));
          toast.success("Logged in Sucessfully...", { replace: true });
          setTimeout(() => {
            navigate("/about", { replace: true });
          }, 1000);

          handleClose();
        } else if (resultData.message === "Wrong password") {
          toast.error("Invalid Password", { position: "top-right" });
        } else {
          console.log(resultData);
          toast.error("Invalid email", { position: "top-right" });
        }
      })

      .catch((err) => console.log(err));

    if (password.length < 6) {
      alert("Password should be greater than 8 characters");
    }

    if (!email.includes("@")) {
      alert("email should contain @");
    }

    // console.log('Email:', email);

    // console.log('Password:', password);
  };

  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>

          Open Login

        </Button> */}

      <Dialog open={open}>
        <DialogTitle>Login</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please enter your email and password to login.
          </DialogContentText>

          <form onSubmit={handleLogin}>
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* <Email/> */}

            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>

          {/* <LockOpenIcon/> */}

          <Link to="/signup">
            <Button>New User?</Button>
          </Link>
        </DialogContent>

        <DialogActions>
          <Link to="/about">
            <Button>Cancel</Button>
          </Link>

          <Button type="submit" onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
