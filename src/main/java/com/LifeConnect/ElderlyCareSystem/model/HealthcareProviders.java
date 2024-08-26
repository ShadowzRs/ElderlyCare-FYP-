package com.LifeConnect.ElderlyCareSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
public class HealthcareProviders {
    @Id
    private String id;
    private String firstname, lastname, password, email, gender, roles;
    private int age, phonenumber;

    public HealthcareProviders(String id, String firstname, String lastname, String password, String email, int age, String gender, int phonenumber, String roles) {
        this.id = generateId();
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
        this.age = age;
        this.gender = gender;
        this.phonenumber = phonenumber;
        this.roles = roles;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(int phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
