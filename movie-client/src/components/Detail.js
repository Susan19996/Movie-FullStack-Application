/**
 * The detail page for the movie information.
 */

import React from "react";
import {OmdbMovieService} from "../services/OmdbMovieService";
import MovieService from "../services/MovieService";
import FanService from "../services/FanService";
import MovieReviewInput from "./MovieReviewInput";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ReviewService from "../services/ReviewService";
import history from "./history";
import UserReview from "./UserReview";
import Divider from "@material-ui/core/Divider";

export class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.movieId = this.props.match.params.id;
        this.state = {movie:{},reviews:[],movieInDB:false,movieLiked:false,currentReview:-1};
        this.userService = new FanService();
    }

    componentDidMount() {
        OmdbMovieService.findMovieByID(this.movieId)
            .then(movie => this.setState({movie:movie}));
        MovieService.findAllReviews(this.movieId)
            .then(reviews => this.setState({reviews:reviews}));
        MovieService.findMovieByimdbID(this.movieId)
            .then(movie => {
                if (movie.id !== 0) {
                    this.setState({movieInDB:true})
                }
            });
        this.userService.getLikedMovies(this.props.user.username)
            .then(movies => {
                for (let i = 0 ; i < movies.length ; i++) {
                    if (movies[i].imdbID === this.movieId) {
                        this.setState({movieLiked:true});
                    }
                }
            })
    }

    addMovie = () => {
      let newMovie = {
          'title':this.state.movie.Title,
          'imdbID':this.movieId,
          'numLikes':0,
          'numDislikes':0
      }

      MovieService.addMovie(newMovie,this.props.user.username)
          .then(response => this.setState({movieInDB:true}));

    };

    likeMovie = () => {
      MovieService.fanLikeMovie(this.movieId, this.props.user.username)
          .then(response => this.setState({movieLiked:true}));
    };

    renderInfo = () => {
      return Object.keys(this.state.movie).filter(info => (info !== "Ratings"
                                                           && info !== "Title"
                                                           && info !== "imdbID"
                                                           && info !== "Type"
                                                           && info !== "DVD"
                                                           && info !== "Website"
                                                           && info !== "Response"
                                                           && info !== "Year"
                                                           && info !== "Poster"
                                                           && info !== "Plot"))
          .map(info => <li className="list-group-item border-0 pt-0">
                            <b>{info}</b>: {this.state.movie[info]}
                        </li>);
    };

    saveReview = (review) => {
      let newReview = {
          'writer':this.props.user.username,
          'movieTitle':this.state.movie.Title,
          'createTime':new Date().getTime(),
          'text':review
      };
      ReviewService.addReview(newReview,this.movieId)
          .then(review => {
              let increReview = this.state.reviews;
              increReview.push(review);
              this.setState({reviews:increReview});
          });
    };

    renderReviews = () => {
      return (
          <div className="w-100">
              <h4>Fan Reviews:</h4>
              <ul className="list-group">
                  {this.state.reviews.map((review,index) => <li onMouseEnter={() => this.setState({currentReview:index})}
                                                                onMouseLeave={() => this.setState({currentReview:-1})}
                                                                onClick={() => history.push("/PROFILE/"+review.writer)}
                                                                className={this.state.currentReview === index?"list-group-item border-0 active":"list-group-item border-0"}><UserReview user={review.writer} review={review.text}/></li>)}
              </ul>
          </div>
      )
    };

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-8"><h1>{this.state.movie.Title}</h1></div>
                    <div className="col-4">
                        {this.props.login && this.props.user.userType === "ADMIN" && !this.state.movieInDB && <button onClick={() => this.addMovie()} className="btn btn-primary mt-2 float-right">Recommend</button>}
                        {this.props.login && this.props.user.userType === "ADMIN" && this.state.movieInDB && <p className="btn btn-warning disabled mt-2 float-right">Movie Recommended</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4 pl-0">
                        <img src={this.state.movie.Poster} width="100%"/>
                        <div className="d-flex justify-content-center mt-2">
                            <a className="btn btn-warning"
                               href={this.state.movie.Website} target="_blank">Movie Website</a>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            {this.props.login && this.state.movieInDB && this.props.user.userType==="FAN" && !this.state.movieLiked && <i className="fa fa-thumbs-up fa-2x text-primary" onClick={() => this.likeMovie()}></i>}
                            {this.props.login && this.state.movieInDB && this.props.user.userType==="FAN" && this.state.movieLiked && <i className="fa fa-thumbs-up fa-2x text-success"></i>}
                            {this.props.login && this.state.movieInDB &&this.props.user.userType==="FAN" && this.state.movieLiked && <div className="d-flex">
                                <p className="ml-2 pt-1">Liked</p>
                                <i className="fa fa-check text-danger"></i>
                            </div>}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <ul className="list-group">
                            {this.renderInfo()}
                        </ul>
                        <p><i>{this.state.movie.Plot}</i></p>
                    </div>
                </div>


                <div className="row mt-2 pt-2 border-top" id="review_section">
                    {this.state.reviews.length !== 0 && this.renderReviews()}
                    {this.state.reviews.length === 0 && <h4>No reviews</h4>}
                </div>
                <div className="row mt-2 mb-5 justify-content-center">
                    {this.props.login && this.props.user.userType === "FAN"
                     && this.state.movieInDB && <MovieReviewInput saveReview={this.saveReview}/>}

                    {this.props.login && this.props.user.userType === "FAN"
                     && !this.state.movieInDB
                     && <Paper elevation={10} className="p-3 text-center">
                        <Typography variant="h5">
                            Please wait for the movie be recommended before writing review.
                        </Typography>
                    </Paper>}

                    {!this.props.login && <Paper elevation={10} className="p-3 text-center">
                        <Typography variant="h5">
                            Please login to write review.
                        </Typography>
                    </Paper>}
                </div>
            </div>
        )
    }
}