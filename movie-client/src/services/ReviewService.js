const REVIEW_SERVICE_URL = "https://movietable-server.herokuapp.com/api/review";
const REVIEW_SERVICE_URL_LOCAL = "http://localhost:8080/api/review";

export default class ReviewService {
    static addReview(review, imdbId) {
        return fetch(REVIEW_SERVICE_URL+"/"+imdbId, {
                                                      body:JSON.stringify(review),
                                                      headers:{
                                                          'Content-Type': 'application/json'
                                                      },
                                                      method:"POST"
                                                  }).then(response => response.json());
    }
}