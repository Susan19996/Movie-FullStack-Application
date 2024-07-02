/**
 * The movie search component for search movie from the remote OMDd API.
 */
import React from "react";
import history from "./history";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Text from "@material-ui/icons/Movie";

export class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {keyword:""};
    }

    keywordChange = (event) => {
        this.setState({keyword:event.target.value});
    };

    toResult = () => {
        history.push("/SEARCH/" + this.state.keyword);
    };

    render() {
        return (
            <div className="container w-75">
                <h1>Search Movies</h1>
                <div className="input-group">
                    {/*<input type="text"
                           placeholder="keyword"
                           onChange={this.keywordChange}
                           className="form-control"/>*/}
                    <div className="form-control border-0">
                        <TextField variant="outlined" onChange={this.keywordChange} fullWidth={true} label="Keyword" InputProps={{
                            startAdornment: <InputAdornment position="start"><Text/></InputAdornment>
                        }}/>
                    </div>
                    <div className="input-group-append mt-3 ml-2">
                        <button className="btn btn-primary rounded"
                                onClick={this.toResult}>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}