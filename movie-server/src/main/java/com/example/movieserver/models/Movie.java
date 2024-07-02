package com.example.movieserver.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

/**
 * Movie class to represent a movie object.
 */

@Entity
public class Movie {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String title;
  private String imdbID;
  private int numLikes;
  private int numDislikes;

  @OneToOne
  @JsonIgnore
  private Admin admin;

  @OneToMany(mappedBy = "movie")
  private List<Review> reviews;

  @ManyToMany(mappedBy = "likeMovies")
  @JsonIgnore
  private List<Fan> likedFans;

  public Movie(String title, String imdbID, List<Review> reviews,
               List<Fan> likedFans, Admin admin) {
    this.title = title;
    this.imdbID = imdbID;
    this.reviews = reviews;
    this.likedFans = likedFans;
    this.admin = admin;
  }

  public Movie() {}

  public void addReview(Review review) {
    this.reviews.add(review);
  }

  public void addLikedFan(Fan fan) {
    this.likedFans.add(fan);
  }

  public Admin getAdmin() {
    return admin;
  }

  public void setAdmin(Admin admin) {
    this.admin = admin;
  }

  public int getNumLikes() {
    return numLikes;
  }

  public void setNumLikes(int numLikes) {
    this.numLikes = numLikes;
  }

  public int getNumDislikes() {
    return numDislikes;
  }

  public void setNumDislikes(int numDislikes) {
    this.numDislikes = numDislikes;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getImdbID() {
    return imdbID;
  }

  public void setImdbID(String imdbID) {
    this.imdbID = imdbID;
  }

  public List<Review> getReviews() {
    return reviews;
  }

  public void setReviews(List<Review> reviews) {
    this.reviews = reviews;
  }

  public List<Fan> getLikedFans() {
    return likedFans;
  }

  public void setLikedFans(List<Fan> likedFans) {
    this.likedFans = likedFans;
  }
}
