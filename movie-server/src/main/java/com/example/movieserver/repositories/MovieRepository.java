package com.example.movieserver.repositories;

import com.example.movieserver.models.Fan;
import com.example.movieserver.models.Movie;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends CrudRepository<Movie, Integer> {
  @Query("SELECT movie FROM Movie movie WHERE movie.imdbID=:imdbID")
  public Movie findMovieByImdbID(@Param("imdbID") String imdbID);
}
