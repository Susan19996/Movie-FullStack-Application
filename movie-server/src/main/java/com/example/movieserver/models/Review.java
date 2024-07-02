package com.example.movieserver.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * Review class to represent a review for a movie and write by a fan.
 */

@Entity
public class Review {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @OneToOne
  @JsonIgnore
  private Fan fan;

  @OneToOne
  @JsonIgnore
  private Movie movie;

  private String writer;
  private String movieTitle;
  private Date createTime;
  private String text;

  public Review(Fan fan, Movie movie, String writer, String movieTitle, Date createTime) {
    this.fan = fan;
    this.movie = movie;
    this.writer = writer;
    this.movieTitle = movieTitle;
    this.createTime = createTime;
  }

  public Review() {}

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Date getCreateTime() {
    return createTime;
  }

  public void setCreateTime(Date createTime) {
    this.createTime = createTime;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public Fan getFan() {
    return fan;
  }

  public void setFan(Fan fan) {
    this.fan = fan;
  }

  public Movie getMovie() {
    return movie;
  }

  public void setMovie(Movie movie) {
    this.movie = movie;
  }

  public String getWriter() {
    return writer;
  }

  public void setWriter(String writer) {
    this.writer = writer;
  }

  public String getMovieTitle() {
    return movieTitle;
  }

  public void setMovieTitle(String movieTitle) {
    this.movieTitle = movieTitle;
  }
}
