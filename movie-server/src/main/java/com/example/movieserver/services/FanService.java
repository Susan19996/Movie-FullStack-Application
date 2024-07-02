package com.example.movieserver.services;

import com.example.movieserver.models.Fan;
import com.example.movieserver.models.Movie;
import com.example.movieserver.models.Review;
import com.example.movieserver.repositories.FanRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import javax.servlet.http.HttpSession;

/**
 * Service class relating to Fan models
 */

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class FanService {
  @Autowired
  FanRepository fanRepository;

  @PostMapping("api/fan/register")
  public Fan register(@RequestBody Fan user, HttpSession session) {
    if (fanRepository.findUserByUsername(user.getUsername()) != null) {
      Fan fan = fanRepository.save(user);
      session.setAttribute("currentFan", fan);
      return fan;
    }
    return new Fan();
  }

  @GetMapping("api/fan/profile")
  public Fan profile(HttpSession session) {
    return (Fan)session.getAttribute("currentFan");
  }

  @PostMapping("api/fan/login")
  public Fan login(@RequestBody Fan credentials, HttpSession session) {
     List<Fan> fans = fanRepository.findUserByCredentials(credentials.getUsername(),
             credentials.getPassword());
     if (fans.size() != 0) {
       session.setAttribute("currentFan", fans.get(0));
       return fans.get(0);
     }
     return new Fan();
  }

  @PostMapping("api/fan/logout")
  public void logout(HttpSession session) {
    session.invalidate();
  }

  @GetMapping("api/fan/all")
  public List<Fan> getAllFans() {
    return (List<Fan>)fanRepository.findAll();
  }

  @GetMapping("api/fan/{id}")
  public Fan getFanById(@PathVariable("id") int id) {
    if (fanRepository.findById(id).isPresent()) {
      return fanRepository.findById(id).get();
    }
    return new Fan();
  }

  @PutMapping("api/fan/profile")
  public Fan updateProfile(@RequestBody Fan user, HttpSession session) {
    Fan fan;
    if (fanRepository.findById(user.getId()).isPresent()) {
      fan = fanRepository.findById(user.getId()).get();
      fan.setFan(user);
      session.setAttribute("currentFan", fan);
      return fanRepository.save(fan);
    }
    return new Fan();
  }

  @GetMapping("api/fan/profile/{username}")
  public Fan getFanProfileByName(@PathVariable("username") String username) {
    return fanRepository.findUserByUsername(username).get(0);
  }

  @GetMapping("api/fan/{username}/movies")
  public List<Movie> getFanLikedMovies(@PathVariable("username") String username) {
    Fan currentFan = fanRepository.findUserByUsername(username).get(0);
    return currentFan.getLikeMovies();
  }

  @GetMapping("api/fan/{username}/reviews")
  public List<Review> getFanReviews(@PathVariable("username") String username) {
    Fan currentFan = fanRepository.findUserByUsername(username).get(0);
    return currentFan.getReviews();
  }


  @DeleteMapping("api/fan/{id}")
  public void deleteFan(@PathVariable("id") int id) {
    fanRepository.deleteById(id);
  }

}
