/**
 * Register page for user to register account.
 */

import React from "react";
import "../styles/register.style.client.css";
import {Link} from "react-router-dom";
import history from "./history";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLable from  "@material-ui/core/InputLabel";


const Register = ({registerUser}) =>
    <div className="register d-flex justify-content-center">
        <div className="container" id="register_section">
            <div className="d-flex flex-row justify-content-center mb-5">
                <i className="fa fa-registered fa-4x"></i>
            </div>
            <div className="alert alert-danger d-none" role="alert" id="alert">
                Username is existed! Please choose another username!
            </div>
            <div>
                <div className="form-group row">
                    <div className="col-sm">
                        <TextField type="text"
                                   label="Username"
                                   variant="filled"
                               id="register-username"
                               className="w-100" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm">
                        <TextField type="password"
                                   label="Password"
                                   variant="filled"
                               id="register-password"
                               className="w-100" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm">
                        <TextField type="password"
                                   label="Verify Password"
                                   variant="filled"
                               id="verify-password"
                               className="w-100" />
                    </div>
                </div>
                <div className="form-group row">
                    <FormControl className="w-100">
                        <InputLable>Role</InputLable>
                        <Select native variant="outlined" id="register-role" className="w-100">
                            <option value="FAN">Fan</option>
                            <option value="ADMIN">MovieCreator</option>
                        </Select>
                    </FormControl>
                </div>
                <div className="form-group row">
                    <div className="col-sm">
                        <Button color="primary" variant="contained" className="w-100" onClick={
                            () => {
                                let password = document.getElementById("register-password").value.trim();
                                let verifyPassword = document.getElementById("verify-password").value.trim();
                                let username = document.getElementById("register-username").value.trim();
                                let userType = document.getElementById("register-role").value;
                                if (username === "" || password === "") {
                                    alert("All field is required!");
                                }
                                else if (password !== verifyPassword) {
                                    alert("Input passwords do not match please re-enter!");
                                }
                                else{
                                    let user = {
                                        "username":username,
                                        "password":password,
                                        "userType":userType
                                    };
                                    registerUser(user).then(result => {
                                        if (result) {
                                            history.push("/SEARCH");
                                        }
                                        else {
                                            document.getElementById("alert").className = "alert alert-danger";
                                        }
                                    });
                                }
                            }
                        }>Sign Up</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Link to="/">
                            <span className="float-left" >Cancel</span>
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link to="/LOGIN">
                            <span className="float-right">Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

export default Register;