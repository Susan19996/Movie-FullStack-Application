const MOVIE_SERVICE_URL = "https://movietable-server.herokuapp.com/api/movie";
const MOVIE_SERVICE_URL_LOCAL = "http://localhost:8080/api/movie";
/**
 * Movie Service class to interact with backend server.
 */

export default class MovieServie {
    static addMovie(movie,admin) {
        return fetch(MOVIE_SERVICE_URL+"/"+admin, {
            body:JSON.stringify(movie),
            headers:{
                'Content-Type': 'application/json'
            },
            method:"POST"
        }).then(response => response.json());
    }

    static findAllMovies() {
        return fetch(MOVIE_SERVICE_URL).then(response => response.json());
    }

    static findAllReviews(imdbID) {
        return fetch(MOVIE_SERVICE_URL+"/"+imdbID+"/review")
            .then(response => response.json());
    }

    static findMovieByimdbID(imdbID) {
        return fetch(MOVIE_SERVICE_URL+"/"+imdbID)
            .then(response => response.json());
    }

    static fanLikeMovie(imdbID, fan) {
        return fetch(MOVIE_SERVICE_URL+"/"+imdbID+"/"+fan+"/like")
            .then(response => response.json());
    }
}