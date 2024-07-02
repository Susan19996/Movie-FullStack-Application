package com.example.movieserver.services;


import com.example.movieserver.models.Fan;
import com.example.movieserver.models.Movie;
import com.example.movieserver.models.Review;
import com.example.movieserver.repositories.FanRepository;
import com.example.movieserver.repositories.MovieRepository;
import com.example.movieserver.repositories.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Review Service class relating to review models
 */

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReviewService {
  @Autowired
  ReviewRepository reviewRepository;
  @Autowired
  MovieRepository movieRepository;
  @Autowired
  FanRepository fanRepository;

  @PostMapping("/api/review/{imdbID}")
  public Review addReview(@RequestBody Review review, @PathVariable String imdbID) {
    Review currentReview = reviewRepository.save(review);
    Movie currentMovie = movieRepository.findMovieByImdbID(imdbID);
    Fan currentFan = fanRepository.findUserByUsername(currentReview.getWriter()).get(0);
    currentReview.setFan(currentFan);
    currentReview.setMovie(currentMovie);
    currentMovie.addReview(currentReview);
    currentFan.addReview(currentReview);
    movieRepository.save(currentMovie);
    fanRepository.save(currentFan);
    return reviewRepository.save(currentReview);
  }

  @GetMapping("/api/review")
  public List<Review> getAllReviews() {
    return (List<Review>)reviewRepository.findAll();
  }
}
