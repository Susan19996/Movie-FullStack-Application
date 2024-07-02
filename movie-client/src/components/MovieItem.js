/**
 * The movie item from the search result from the API.
 */

import React from 'react';
import history from "./history";
export class MovieItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedItem:""}
    }

    toDetail = () => {
        history.push("/DETAIL/" + this.state.selectedItem)
    };

    renderMovieItems = () => {
        return this.props.movies.Search.map(movie =>
            <ul className="list-group">
                <li onMouseEnter={() => this.setState({selectedItem:movie.imdbID})}
                    onClick={this.toDetail}
                    className = {this.state.selectedItem === movie.imdbID ?
                                 'list-group-item active' :'list-group-item'}>
                    <img src = {movie.Poster} alt="" className="mr-2" width="50px"/>
                    {movie.Title}
                </li>
            </ul>
        )
    };

    render() {
        return (
                <div className="mt-2">
                    {this.props.movies.hasOwnProperty("Search") && this.renderMovieItems()}
                    {!this.props.movies.hasOwnProperty("Search") && <p>Please search again !</p>}
                </div>
        )
    }
}