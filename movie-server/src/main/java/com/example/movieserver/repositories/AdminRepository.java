package com.example.movieserver.repositories;

import com.example.movieserver.models.Admin;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdminRepository extends CrudRepository<Admin, Integer>{
  @Query("SELECT admin FROM Admin admin WHERE admin.username=:username")
  public List<Admin> findUserByUsername(@Param("username") String username);

  @Query("SELECT admin FROM Admin admin WHERE admin.username=:username " +
          "AND admin.password=:password")
  public List<Admin> findUserByCredentials(@Param("username") String username,
                                         @Param("password") String password);
}
