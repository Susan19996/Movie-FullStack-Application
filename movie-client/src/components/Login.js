/**
 * Login component for user to login into the application.
 */

import React from "react";
import "../styles/login.style.client.css";
import {Link} from "react-router-dom"
import history from "./history";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLable from  "@material-ui/core/InputLabel";

const Login = ({loginUser}) =>
    <div className="login d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-center mb-5">
            <Paper elevation={10} className="w-50 p-5 text-center">
                <Typography variant="h5">
                    Movie Table
                </Typography>
            </Paper>
        </div>
        <div className="container" id="login_section">
            <div className="d-flex flex-row justify-content-center">
                <i className="fa fa-file-movie-o mb-2 fa-4x"></i>
            </div>
            <div className="alert alert-danger d-none" role="alert" id="alert">
                Username or Password is wrong! Please try again!
            </div>
            <div>
                <div className="form-group row">
                    <div className="col-sm">
                        <TextField type="text"
                                   label="Username"
                                   id="login-username"
                                   className="w-100"/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm">
                        <TextField type="password"
                                   placeholder="Password"
                                   label="Password"
                                   id="login-password"
                                   className="w-100"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <FormControl className="w-100">
                        <InputLable>Role</InputLable>
                        <Select native variant="outlined" id="login-role" className="w-100">
                            <option value="FAN">Fan</option>
                            <option value="ADMIN">MovieCreator</option>
                        </Select>
                    </FormControl>
                </div>
                <div className="form-group row">
                    <div className="col-sm">
                        <Button variant="contained" color="primary" className="w-100" onClick={()=>{
                            let username = document.getElementById("login-username").value.trim();
                            let password = document.getElementById("login-password").value;
                            let userType = document.getElementById("login-role").value;
                            let user = {
                                "username":username,
                                "password":password,
                                "userType":userType
                            };
                            loginUser(user).then(result => {
                                if(result){
                                    history.push("/");
                                }
                                else {
                                    document.getElementById("alert").className = "alert alert-danger";
                                }
                            })
                        }}>Sign In</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5">
                        <Link to="/">
                            <span className="float-left">Cancel</span>
                        </Link>
                    </div>
                    <div className="col-2">
                        {/*<Link to="/ChatBot">
                            <span>ChatBot</span>
                        </Link>*/}
                    </div>
                    <div className="col-5">
                        <Link to="/register">
                            <span className="float-right">Register Account</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>;

export default Login;