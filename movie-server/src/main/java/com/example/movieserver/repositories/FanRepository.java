package com.example.movieserver.repositories;

import com.example.movieserver.models.Fan;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FanRepository extends CrudRepository<Fan, Integer>{
  @Query("SELECT fan FROM Fan fan WHERE fan.username=:username")
  public List<Fan> findUserByUsername(@Param("username") String username);

  @Query("SELECT fan FROM Fan fan WHERE fan.username=:username " +
          "AND fan.password=:password")
  public List<Fan> findUserByCredentials(@Param("username") String username,
                                         @Param("password") String password);
}
