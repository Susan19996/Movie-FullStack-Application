/**
 * The navigation component for the application
 */

import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import history from './history';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PeopleIcon from "@material-ui/icons/People";
import ExitIcon from "@material-ui/icons/ExitToApp";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {left:false};
    }

    render() {
        return (
            <div className="w-100 mb-3">
                <AppBar position="static" color="primary" className={{}}>
                    <Toolbar>
                        {this.props.login && <IconButton color="inherit" aria-label="Menu" onClick={()=>this.setState({left:true})} >
                            <MenuIcon />
                        </IconButton>}
                        <Typography className="flex-grow-1" variant="h6" color="inherit">
                            MovieTable
                        </Typography>
                        <Button color="inherit" onClick={() => history.push("/")}>Home</Button>
                        <Button color="inherit" onClick={() => history.push("/SEARCH")}>Search</Button>
                        {!this.props.login && <Button color="inherit"
                                                      onClick={() => history.push("/LOGIN")}>Login</Button>}
                        {this.props.login && <Typography variant="h6"
                                                         color="inherit">Hi {this.props.user.username}</Typography>}
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.left} onClose={()=>this.setState({left:false})}>
                    <div tabIndex={0} role="button">
                        <List>
                            <ListItem button onClick={()=>{
                                this.setState({left:false});
                                history.push("/PROFILE")}}>
                                <ListItemIcon><PeopleIcon/></ListItemIcon>
                                <ListItemText >Profile</ListItemText>
                            </ListItem>
                            <Divider/>
                            <ListItem button onClick={()=>{
                                this.props.logoutUser();
                                this.setState({left:false});
                                history.push("/");}}>
                                <ListItemIcon><ExitIcon/></ListItemIcon>
                                <ListItemText >Logout</ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Navigation;