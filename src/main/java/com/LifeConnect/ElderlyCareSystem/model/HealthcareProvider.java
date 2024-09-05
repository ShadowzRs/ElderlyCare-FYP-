package com.LifeConnect.ElderlyCareSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
public class HealthcareProvider {
    @Id
    private String id;
    private String firstname, lastname, password, email, gender, phonenumber, role;
    private int age;

    public HealthcareProvider() {
        this.id = generateId();
    }

    private String generateId() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMddHHmmss"); //Year-Month-Date-Hour-Min-Sec
        return LocalDateTime.now().format(formatter);
    }

    public String getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getRole() {
        return role;
    }

    public void setRoles(String role) {
        this.role = role;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
