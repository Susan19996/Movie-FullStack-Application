/**
 * The home page content for the application.
 */

import React from 'react';
import MovieService from "../services/MovieService";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "../styles/homepage.style.client.css";
import history from "./history";

class HomePage extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {movies: [], userReview: [], selectedMovie: {}, recommend: [], selectedRecommend: ""};
    }

    componentDidMount() {
        MovieService.findAllMovies()
            .then(movies => this.setState({movies:movies}));
        if (this.props.login && this.props.user.userType === "FAN") {
            this.props.userService.getAllReviews(this.props.user.username)
                .then(reviews => {
                    this.setState({userReview:reviews});
                });
        }
        if (this.props.login && this.props.user.userType === "ADMIN") {
            this.props.userService.getRecommendMovies(this.props.user.username)
                .then(recommends => {
                    this.setState({recommend:recommends});
                });
        }
    }

    componentDidUpdate() {
    }

    renderMovies = () => {
        return (
            <ul className="list-group random_display">
                {this.state.movies.map((movie,index) =>
                                           <li onMouseEnter={() => this.setState({selectedMovie:movie.imdbID})}
                                               onMouseLeave={() => this.setState({selectedMovie:''})}
                                               onClick={() => history.push("/DETAIL/"+this.state.selectedMovie)}
                                               className={this.state.selectedMovie === movie.imdbID ?
                                                          'list-group-item active border-0':'list-group-item border-0'}>
                                               <i className="fa fa-file-movie-o"></i> {movie.title}</li>)}
            </ul>
        )
    };

    renderReviews = () => {
        return (
            <ul className="list-group">
                {this.state.userReview.map((review,index) =>
                                                    <li className="list-group-item border-0">
                                                        <i className="fa fa-pencil"></i> {review.movieTitle}: {review.text}
                                                        </li>)}
            </ul>
        )
    };

    renderRecomend = () => {
        return (
            <ul className="list-group">
                {this.state.recommend.map((movie,index) =>
                                           <li onMouseEnter={() => this.setState({selectedRecommend:movie.imdbID})}
                                               onMouseLeave={() => this.setState({selectedRecommend:''})}
                                               onClick={() => history.push("/DETAIL/"+this.state.selectedRecommend)}
                                               className={this.state.selectedRecommend === movie.imdbID ?
                                                          'list-group-item active border-0':'list-group-item border-0'}>
                                               {movie.title}</li>)}
            </ul>
        )
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1>Movie Table</h1>
                    <h6>
                        Movie Table is a place where you can search and talk about movies
                        just like sitting around a table with your friends.
                    </h6>
                </div>
                <div className="row">
                    <div className="col-6 border-right" id="random_movie_display">
                        <h5 className="random_display"><i>--10 discussed movies on the table--</i></h5>
                        {this.renderMovies()}
                    </div>
                    {!this.props.login && <div className="col-6" id="user_favor">
                                            <Paper elevation={10} className="w-50 p-4 text-center" id="need_login">
                                                <Typography variant="h6">
                                                    Login To See Customized Info.
                                                </Typography>
                                            </Paper>
                                            </div>}
                    {this.props.login && this.props.user.userType === "FAN" &&
                     <div>
                         <h5><i>{this.props.user.username} reviewed movies:</i></h5>
                         {this.state.userReview.length !== 0 && this.renderReviews() }
                     </div>}
                    {this.props.login && this.props.user.userType === "ADMIN" &&
                    <div>
                        <h5><i>{this.props.user.username} recommened movies:</i></h5>
                        {this.state.recommend.length !== 0 && this.renderRecomend() }
                    </div>}
                </div>
            </div>
        )
    }
}

export default HomePage;