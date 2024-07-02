/**
 * The home page for the application.
 */

import React from "react";
import {Router, Route, Link} from 'react-router-dom';
import history from "../components/history";
import {SearchComponent} from "../components/SearchComponent";
import {SearchComponentResult} from "../components/SearchComponentResult";
import {Detail} from "../components/Detail";
import Login from "../components/Login";
import Register from "../components/Register";
import FanService from "../services/FanService";
import AdminService from "../services/AdminService";
import Profile from "../components/Profile";
import Paper from "@material-ui/core/Paper";
import Navigation from "../components/Navigation";
import HomePage from "../components/HomePage";
import ProfilePublic from "../components/ProfilePublic";
import Canvas from "../components/Canvas";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: {}, login: false};
        this.userService = new FanService();
    }

    registerUser = (user) => {
        if (user.userType === "FAN") {
            this.userService = new FanService();
        }
        else {
            this.userService = new AdminService();
        }
        return this.userService.register(user)
            .then(usr => {
                console.log(usr);
                if (usr.id !== 0) {
                    this.setState({user:usr,login:true});
                    return true;
                }
                else {
                    return false;
                }
            })
    };

    loginUser = (user) => {
        if (user.userType === "FAN") {
            this.userService = new FanService();
        }
        else {
            this.userService = new AdminService();
        }
        return this.userService.login(user)
            .then(usr => {
                if (usr.id !== 0) {
                    this.setState({user:usr,login:true});
                    return true;
                }
                else {
                    return false;
                }
            })
    };

    updateProfile = (user) => {
        return this.userService.updateProfile(user)
            .then(usr => {
                this.setState({user:usr});
                return true;
            })
    };

    logout = () => {
        this.userService.logoutUser();
        this.setState({user:{},login:false});
    }

    render() {
        return (
            <Router history={history}>
                <div className="container-fluid">
                    <Navigation login={this.state.login} user={this.state.user} logoutUser={this.logout}/>
                    <div className="container-fluid">
                        <Route path="/HOME" exact={true}
                               redner={() => <HomePage login={this.state.login}
                                                       user={this.state.user}
                                                       userService={this.userService}/>}/>
                        <Route path="/" exact={true}
                               render={() => <HomePage login={this.state.login}
                                                       user={this.state.user}
                                                       userService={this.userService}/>}/>

                        <Route path="/SEARCH" exact={true}
                               render={() => <SearchComponent/>}/>
                        <Route path="/SEARCH/:keyword"
                               render={(props) => <SearchComponentResult {...props}/>}/>
                        <Route path="/DETAIL/:id"
                               render={(props) => <Detail {...props} login={this.state.login} user={this.state.user}/>}/>
                        <Route path="/LOGIN"
                               render={() => <Login loginUser={this.loginUser}/>}/>
                        <Route path="/REGISTER"
                               render={() => <Register registerUser={this.registerUser}/>}/>
                        <Route path="/PROFILE/:username"
                               render={(props) => <ProfilePublic {...props}/>}/>
                        <Route path="/PROFILE" exact={true}
                               render={() => {
                                   if (this.state.login) {
                                       return <Profile user={this.state.user}
                                                updateProfile={this.updateProfile}/>
                                   }
                                   else {
                                       return  <div className="d-flex justify-content-center">
                                           <Paper className="text-center w-50 mt-5 pt-3"
                                                  elevation="20">
                                               <p>You must <Link to="/LOGIN">login</Link> first to see your profile</p>
                                           </Paper>
                                       </div>
                                   }
                               }} />
                    </div>
                </div>
            </Router>
        )

    }
}