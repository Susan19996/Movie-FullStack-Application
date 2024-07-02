package com.example.movieserver.repositories;

import com.example.movieserver.models.Review;

import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, Integer>{
}
