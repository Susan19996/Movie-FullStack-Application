package com.example.movieserver.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

/**
 * A Fan Class to represent a movie fan.
 */


@Entity
public class Fan extends User {

  @ManyToMany
  @JoinTable(name="CONNECTION", joinColumns = @JoinColumn(name="FAN_ID",referencedColumnName = "ID"),
          inverseJoinColumns = @JoinColumn(name="MOVIE_ID",referencedColumnName = "ID"))
  @JsonIgnore
  private List<Movie> likeMovies;

  @OneToMany(mappedBy = "fan")
  private List<Review> reviews;

  public Fan(String username, String password, String firstName, String lastName, String email,
             String userType, List<Movie> likeMovies, List<Review> reviews) {
    super(username, password, firstName, lastName, email, userType);
    this.likeMovies = likeMovies;
    this.reviews = reviews;
  }

  public Fan(){}


  public void addReview(Review review) {
    this.reviews.add(review);
  }

  public void setFan(Fan fan) {
    this.setFirstName(fan.getFirstName());
    this.setLastName(fan.getLastName());
    this.setEmail(fan.getEmail());
  }

  public List<Movie> getLikeMovies() {
    return likeMovies;
  }

  public void addLikedMovie(Movie movie) {
    this.likeMovies.add(movie);
  }

  public void setLikeMovies(List<Movie> likeMovies) {
    this.likeMovies = likeMovies;
  }

  public List<Review> getReviews() {
    return reviews;
  }

  public void setReviews(List<Review> reviews) {
    this.reviews = reviews;
  }
}
