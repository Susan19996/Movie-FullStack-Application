package com.example.movieserver.services;

import com.example.movieserver.models.Admin;
import com.example.movieserver.models.Movie;
import com.example.movieserver.repositories.AdminRepository;

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
 * Service class relating to Admin models
 */

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminService {
  @Autowired
  AdminRepository adminRepository;

  @PostMapping("api/admin/register")
  public Admin register(@RequestBody Admin user, HttpSession session) {
    if (adminRepository.findUserByUsername(user.getUsername()) != null) {
      Admin admin = adminRepository.save(user);
      session.setAttribute("currentAdmin", admin);
      return admin;
    }
    return new Admin();
  }

  @GetMapping("api/admin/profile")
  public Admin profile(HttpSession session) {
    return (Admin)session.getAttribute("currentAdmin");
  }

  @PostMapping("api/admin/login")
  public Admin login(@RequestBody Admin credentials, HttpSession session) {
    List<Admin> admins = adminRepository.findUserByCredentials(credentials.getUsername(),
            credentials.getPassword());
    if (admins.size() != 0) {
      session.setAttribute("currentAdmin", admins.get(0));
      return admins.get(0);
    }
    return new Admin();
  }

  @PostMapping("api/admin/logout")
  public void logout(HttpSession session) {
    session.invalidate();
  }

  @GetMapping("api/admin/all")
  public List<Admin> getAllAdmins() {
    return (List<Admin>)adminRepository.findAll();
  }

  @GetMapping("api/admin/{id}")
  public Admin getAdminById(@PathVariable("id") int id) {
    if (adminRepository.findById(id).isPresent()) {
      return adminRepository.findById(id).get();
    }
    return new Admin();
  }

  @PutMapping("api/admin/profile")
  public Admin updateProfile(@RequestBody Admin user, HttpSession session) {
    Admin admin;
    if (adminRepository.findById(user.getId()).isPresent()) {
      admin = adminRepository.findById(user.getId()).get();
      admin.setAdmin(user);
      session.setAttribute("currentFan", admin);
      return adminRepository.save(admin);
    }
    return new Admin();
  }

  @GetMapping("api/admin/{admin}/recommended")
  public List<Movie> getAllRecommendedMovies(@PathVariable("admin") String admin) {
    return adminRepository.findUserByUsername(admin).get(0).getRecommended();
  }

  @DeleteMapping("api/admin/{id}")
  public void deleteAdmin(@PathVariable("id") int id) {
    adminRepository.deleteById(id);
  }
}
