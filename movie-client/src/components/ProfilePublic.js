/**
 * Public view profile information component.
 */

import React from "react";
import FanService from "../services/FanService";
import history from "./history";
import "../styles/profilepublic.style.client.css";

class ProfilePublic extends React.Component {
    constructor(props) {
        super(props);
        if (typeof this.props.user === 'undefined') {
            this.currentUser = this.props.match.params.username;
        }
        else {
            this.currentUser = this.props.user;
        }
        this.state = {likedMovie:[],reviews:[],currentSelectMovie:""};
        this.service = new FanService();
    }

    componentDidMount() {
        this.service.getAllReviews(this.currentUser)
            .then(reviews => this.setState({reviews:reviews}));
        this.service.getLikedMovies(this.currentUser)
            .then(movies => {
                this.setState({likedMovie:movies});
            });
    }

    renderMovies = () => {
        return (
            <ul className="list-group">
                {this.state.likedMovie.map((movie,index) => <li onMouseEnter={() => this.setState({currentSelectMovie:movie.title})}
                                                                onMouseLeave={() => this.setState({currentSelectMovie:""})}
                                                                onClick={() => history.push("/DETAIL/"+movie.imdbID)}
                                                                className={this.state.currentSelectMovie===movie.title?"list-group-item border-0 active":"list-group-item border-0"}><i className="fa fa-file-movie-o"></i> {movie.title}</li>)}
            </ul>
        );
    };

    renderReviews = () => {
        return (
            <ul className="list-group">
                {this.state.reviews.map((review, index) => <li className="list-group-item border-0">{review.movieTitle}: {review.text}</li>)}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <h4> <i className="fa fa-info fa-2x mr-2 mb-2"></i> {this.currentUser}'s Information </h4>
                <div className="row">
                    <div className="col-6 border-right" id="liked_movie_section">
                        <p><b>{this.currentUser} liked movies </b><i className="fa fa-thumbs-up"></i> </p>
                        {this.state.likedMovie.length !== 0 && this.renderMovies()}
                    </div>
                    <div className="col-6" id="review_section">
                        <p><b>{this.currentUser}'s movie reviews </b><i className="fa fa-pencil"></i></p>
                        {this.state.reviews.length !== 0 && this.renderReviews()}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePublic;