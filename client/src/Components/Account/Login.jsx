import React, { useContext, useEffect } from "react";
import { TextField, Box, Button, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../service/api.js";
import { style } from "@mui/system";
import { DataContext } from "../../contex/DataProvider.jsx";
import image from "../../images/blog-removebg.png";
// const Component = styled(Box)`

//     width: 400px;
//     margin: auto;
//     box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
// `;

// const Error = styled(Typography)`
//     font-size:10px;
//     color:#ff6161;
//     line-height:0;
//     margin-top:10px;
//     font-weight:600;
// `;

// const Image = styled('img')({
//     width: "20rem",
//     display: 'flex',
//     margin: 'auto',
//     padding: '50px 0 0'
// });

// const Wrapper = styled(Box)`
//     padding: 25px 35px;
//     display: flex;
//     flex: 1;
//     overflow: auto;
//     flex-direction: column;
//     & > div, & > button, & > p {
//         margin-top: 20px;
//     }
// `;

// const LoginButton = styled(Button)`
//     text-transform: none;
//     background: #FB641B;
//     color: #fff;
//     height: 48px;
//     border-radius: 2px;
// `;

// const SignupButton = styled(Button)`
//     text-transform: none;
//     background: #fff;
//     color: #2874f0;
//     height: 48px;
//     border-radius: 2px;
//     box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
// `;

// const Text = styled(Typography)`
//     color: #f913fa;
//     font-size: 16px;
// `;

const Component = styled(Box)`
  width: 400px;
  background-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.15)
  );
  backdrop-filter: blur(50px);
  border-radius: 10px;
  margin: auto;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  height: auto;
`;
const Image = styled("img")({
  width: "20rem",
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  & > div,
  & > button,
  & > p {
    margin-top: 10px;
  }
`;

const Error = styled(Typography)`
  font-size: 10px;
  margin-top: 10px;
  line-height: 0;
  font-weight: 600;
`;

const Text = styled(Typography)`
  color: #f913fa;
  font-size: 16px;
`;

const LoginButton = styled(Button)`
  color: #ffffff;
  text-transform: none;
  background: transparent;
  height: 48px;
  border-radius: 10px;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  background-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );

  &:hover {
    background: #f913fa;
    background-image: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    );
  }
`;

const SignupButton = styled(Button)`
  color: #ffffff;
  text-transform: none;
  background: transparent;
  height: 48px;
  border-radius: 10px;
  transition: all 0.7s ease;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  background-image: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );

  &:hover {
    background: #f913fa;
    background-image: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    );
  }
`;

const StyledTextField = styled(TextField)`
  color: "#ffffff !important";
`;

const Login = ({ isUserAuthenticated }) => {
  const signupInitialValues = {
    name: "",
    username: "",
    password: "",
  };

  const loginInitailValue = {
    username: "",
    password: "",
  };

  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitailValue);
  const [error, setError] = useState("");

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
  }, [login]);

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const onValueChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const loginUser = async () => {
    const response = await API.userLogin(login);
    console.log("I am  in response", response);
    if (response.isSuccess) {
      setError("");
      sessionStorage.setItem(
        "accesstoken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshtoken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        username: response.data.username,
        name: response.data.name,
      });
      navigate("/");
      isUserAuthenticated(true);
    } else {
      alert(response.msg);
      setError("Something went Wrong Please try again later!");
    }
  };

  const signupUser = async () => {
    const response = await API.userSignup(signup);

    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      setError("Something went wrong! Please try again Later!");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={image} alt="bloggimg" />

        {account === "login" ? (
          <Wrapper>
            <StyledTextField
              variant="standard"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Username"
              color ="secondary"
              InputProps={{
                style: {
                  color: "white",
                 }}}
              InputLabelProps={{ style: { color: "#220056" } }}
            />
            <TextField
              type="password"
              variant="standard"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Password"
              color ="secondary"
              InputProps={{
                style: {
                  color: "white",
                 }}}
              InputLabelProps={{ style: { color: "#220056" } }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  loginUser();
                }
              }}
            />

            {error && <Error>{error}</Error>}

            <LoginButton varient="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={() => toggleSignup()}>
              Create Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="name"
              value={signup.name}
              label="Enter name"
              color="secondary"
              InputProps={{
                style: {
                  color: "white",
                 }}}
              InputLabelProps={{ style: { color: "#220056" } }}
            />
            <TextField
              variant="standard"
              value={signup.username}
              onChange={(e) => onInputChange(e)}
              name="username"
              color="secondary"
              label="Enter username"
              InputProps={{
                style: {
                  color: "white",
                 }}}
              InputLabelProps={{ style: { color: "#220056" } }}
            />
            <TextField
              variant="standard"
              value={signup.password}
              onChange={(e) => onInputChange(e)}
              name="password"
              color="secondary"
              type="password"
              label="Enter password"
              InputProps={{
                style: {
                  color: "white",
                 }}}
              InputLabelProps={{ style: { color: "#220056" } }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  signupUser();
                }
              }}
            />

            {error && <Error>{error}</Error>}

            <SignupButton onClick={() => signupUser()}>SignUp</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton varient="contained" onClick={() => toggleSignup()}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
