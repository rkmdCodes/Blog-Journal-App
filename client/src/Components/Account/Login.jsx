import React, { useContext } from 'react'
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useState } from 'react';
import { API } from '../../service/api.js'
import { style } from '@mui/system';
import { DataContext } from '../../contex/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Error = styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;


const Login = ({isUserAuthenticated}) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const signupInitialValues = {
        name: '',
        username: '',
        password: ''
    }
    
    const loginInitailValue = {
        username:'',
        password:''
    }
     
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login , setLogin]  = useState(loginInitailValue);
    const [error , setError] = useState('');

    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });

    }
    const onValueChange = (event) =>{
        setLogin({...login,[event.target.name]:event.target.value});
    }

    const loginUser = async () =>{

        let response = await API.userLogin(login);
        if(response.isSuccess)
        {
            setError('');
            sessionStorage.setItem('accesstoken',`Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshtoken',`Bearer ${response.data.refreshToken}`);
            setAccount({username:response.data.username,name:response.data.name});
            navigate("/");
            isUserAuthenticated(true);
        }
        else
        {   alert(response.msg);
            setError('Something went Wrong Please try again later!')
        }


    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if(response.isSuccess)
        {
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        }
        else{
            setError('Something went wrong! Please try again Later!')
        }
    }


    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blogimg" />

                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant='standard' value = {login.username} onChange={(e)=>onValueChange(e)} name='username' label="Enter username" />
                            <TextField  type="password" variant='standard' value = {login.password}  onChange={(e)=>onValueChange(e)} name='password' label="Enter password" />
                              
                             { error && <Error>{error}</Error>} 
                             
                            <LoginButton varient="contained" onClick={()=>loginUser()}>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
                        </Wrapper>

                        :

                        <Wrapper>
                            <TextField variant='standard' onChange={(e) => onInputChange(e)} name='name' label="Enter name" />
                            <TextField variant='standard' onChange={(e) => onInputChange(e)} name='username' label="Enter username" />
                            <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label="Enter password" />
                             
                            { error && <Error>{error}</Error>} 

                            <SignupButton onClick={() => signupUser()} >SignUp</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton varient="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
                
        </Component>
    )
}

export default Login