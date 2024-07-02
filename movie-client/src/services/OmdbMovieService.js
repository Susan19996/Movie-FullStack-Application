/**
 * OmdbMoveService to get movie information using Omdb API.
 */

const APIURL = 'https://omdbapi.com?apikey=aaf3dc59&';

export class OmdbMovieService {
    static findMovieByKeyword(keyword) {
        return fetch(APIURL + "s=" + keyword).then(movies => movies.json());
    }

    static findMovieByID(id) {
        return fetch(APIURL + "i=" + id).then(movie => movie.json());
    }
}

