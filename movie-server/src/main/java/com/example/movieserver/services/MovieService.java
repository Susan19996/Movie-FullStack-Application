package com.example.movieserver.services;

import com.example.movieserver.models.Admin;
import com.example.movieserver.models.Fan;
import com.example.movieserver.models.Movie;
import com.example.movieserver.models.Review;
import com.example.movieserver.repositories.AdminRepository;
import com.example.movieserver.repositories.FanRepository;
import com.example.movieserver.repositories.MovieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import javax.websocket.server.PathParam;

/**
 * Movie Service class relating to movie models
 */


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class MovieService {
  @Autowired
  MovieRepository movieRepository;
  @Autowired
  AdminRepository adminRepository;
  @Autowired
  FanRepository fanRepository;


  @GetMapping("/api/movie")
  public List<Movie> findAllMovies() {
    return (List<Movie>)movieRepository.findAll();
  }

  @PostMapping("/api/movie/{admin}")
  public Movie addMovie(@RequestBody Movie movie, @PathVariable("admin") String admin) {
    Admin currentAdmin = adminRepository.findUserByUsername(admin).get(0);
    Movie currentMovie = movieRepository.save(movie);
    currentMovie.setAdmin(currentAdmin);
    currentAdmin.addRecomended(currentMovie);
    adminRepository.save(currentAdmin);
    return movieRepository.save(currentMovie);
  }

  @GetMapping("/api/movie/{imdbID}")
  public Movie findMovieByImdbID(@PathVariable("imdbID") String imdbID) {
    Movie movie = movieRepository.findMovieByImdbID(imdbID);
    return movie == null? new Movie():movie;
  }

  @GetMapping("/api/movie/{imdbID}/review")
  public List<Review> findReviewsByMovie(@PathVariable("imdbID") String imdbID) {
    Movie movie = movieRepository.findMovieByImdbID(imdbID);
    return movie == null?new ArrayList<>():movie.getReviews();
  }


  @GetMapping("/api/movie/{imdbId}/{fan}/like")
  public Movie likeMovieByImdbID(@PathVariable("imdbId") String imdbID, @PathVariable("fan") String fan) {
    Movie currentMovie = movieRepository.findMovieByImdbID(imdbID);
    Fan currentFan = fanRepository.findUserByUsername(fan).get(0);
    currentFan.addLikedMovie(currentMovie);
    currentMovie.addLikedFan(currentFan);
    currentMovie.setNumLikes(currentMovie.getNumLikes() + 1);
    return movieRepository.save(currentMovie);
  }

  @PutMapping("/api/movie/{imdbId}/dislike")
  public Movie dislikeMovieByImdbID(@PathVariable("imdbID") String imdbID) {
    Movie currentMovie = movieRepository.findMovieByImdbID(imdbID);
    currentMovie.setNumDislikes(currentMovie.getNumDislikes() + 1);
    return movieRepository.save(currentMovie);
  }
}
