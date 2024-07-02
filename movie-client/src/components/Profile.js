import React from "react";
import {Link} from "react-router-dom";
import "../styles/profile.style.client.css";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import ProfilePublic from "./ProfilePublic";
import Divider from "@material-ui/core/Divider";

const Profile = ({user,updateProfile}) =>
    <div className="profile justify-content-center">
        <div className="container" id="profile_section">
            <div className="d-flex flex-row mb-2 justify-content-center">
                <i className="fa fa-user-circle fa-4x"></i>
            </div>
            <div>
                <div className="form-group row">
                    <div className="alert alert-success d-none w-100" role="alert" id="alert">
                            Profile successfully saved!
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm">
                        <TextField type="text"
                                   label="Username"
                                   variant="filled"
                                   defaultValue={user.username}
                                   id="profile-username"
                                   disabled={true}
                                   className="w-100" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm">
                        <TextField type="text"
                                   label="First Name"
                                   variant="filled"
                                   defaultValue={user.firstName}
                                   id="profile-firstName"
                                   className="w-100" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm">
                        <TextField type="text"
                                   label="Last Name"
                                   variant="filled"
                                   defaultValue={user.lastName}
                                   id="profile-lastName"
                                   className="w-100" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm">
                        <TextField type="email"
                                   label="Email"
                                   variant="filled"
                                   defaultValue={user.email}
                                   id="profile-email"
                                   className="w-100" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm">
                        <TextField type="text"
                                   variant="filled"
                                   label="Role"
                                   defaultValue={user.userType==="ADMIN"?"MovieCreator":user.userType}
                                   id="profile-userType"
                                   disabled={true}
                                   className="w-100" />
                    </div>
                </div>

                <div className="form-group row">
                        <Button className="w-100" variant="contained" color="primary" onClick={()=>{
                            let firstName = document.getElementById("profile-firstName").value;
                            let email = document.getElementById("profile-email").value;
                            let lastName = document.getElementById("profile-lastName").value;
                            user["firstName"] = firstName;
                            user["email"] = email;
                            user["lastName"] = lastName;
                            updateProfile(user).then(result => {
                               if (result) {
                                   document.getElementById("alert").className = "alert alert-success w-100";
                               }
                            });
                        }}>Update</Button>
                </div>
                <div className="form-group row">
                    <Link to="/" className="w-100">
                        <Button className="w-100" variant="contained" color="secondary">Back</Button>
                    </Link>
                </div>
            </div>
        </div>
        <Divider/>
        <div className="mt-3 pb-5">
            {user.userType === "FAN" && <ProfilePublic user={user.username}/>}
        </div>
    </div>;
export default Profile;