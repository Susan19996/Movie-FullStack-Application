/**
 * The movie search component for search movie and display searched result from the remote OMDd API.
 */
import React from "react";
import {OmdbMovieService} from "../services/OmdbMovieService";
import {MovieItem} from "./MovieItem";
import history from "./history";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Text from "@material-ui/icons/Movie";

export class SearchComponentResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {searching:true,keyword:"",movies:{Search:[]}, resultKeyword:this.props.match.params.keyword};
    }

    componentDidMount() {
        OmdbMovieService.findMovieByKeyword(this.state.resultKeyword)
            .then(movies => this.setState({movies:movies,searching:false}));
    }

    keywordChange = (event) => {
        this.setState({keyword:event.target.value});
    };

    toResult = () => {
        OmdbMovieService.findMovieByKeyword(this.state.keyword)
            .then(movies => this.setState({movies:movies, searching:false}));
        history.push("/SEARCH/" + this.state.keyword);
    };

    render() {
        return (
            <div className="container w-75">
                <h1>Search Movies</h1>
                <div className="input-group mb-3">
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
                {!this.state.searching && <MovieItem movies={this.state.movies}/>}
                {this.state.searching && <Typography className="mt-5" variant="h3">Searching....</Typography>}
            </div>
        )
    }
}