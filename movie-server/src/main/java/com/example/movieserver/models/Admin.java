package com.example.movieserver.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

/**
 * Admin class to represent a movie administrator who could edit contents in the application.
 */

@Entity
public class Admin extends User {
  @OneToMany(mappedBy = "admin")
  private List<Movie> recommended;

  public Admin(String username, String password, String firstName,
               String lastName, String email, String userType, List<Movie> recommended) {
    super(username, password, firstName, lastName, email, userType);
    this.recommended = recommended;
  }

  public Admin() {}

  public void setAdmin(Admin admin) {
    this.setFirstName(admin.getFirstName());
    this.setLastName(admin.getLastName());
    this.setEmail(admin.getEmail());
  }

  public void addRecomended(Movie movie) {
    recommended.add(movie);
  }

  public List<Movie> getRecommended() {
    return recommended;
  }

  public void setRecommended(List<Movie> recommended) {
    this.recommended = recommended;
  }
}
