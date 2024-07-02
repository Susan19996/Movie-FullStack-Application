package com.example.movieserver.repositories;

import com.example.movieserver.models.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer>{
}
