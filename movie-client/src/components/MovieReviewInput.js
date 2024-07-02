import React from 'react';

/**
 * Input element for writing movie review for user.
 */

const MovieReviewInput = ({saveReview}) => {
  return (
      <div className="w-100">
        <textarea className="w-100" rows="4" cols="50" placeholder="Your review" id="movie_review">
        </textarea>
        <button className="btn btn-primary float-right" onClick={() => {
            let review = document.getElementById("movie_review").value.trim();
            saveReview(review);
            document.getElementById("movie_review").value = "";
        }}>Post</button>
      </div>
  )
};
export default MovieReviewInput;
