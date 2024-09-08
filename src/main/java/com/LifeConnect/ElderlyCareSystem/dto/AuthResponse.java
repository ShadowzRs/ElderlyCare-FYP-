package com.LifeConnect.ElderlyCareSystem.dto;

public class AuthResponse {
    private String role;
    private String id; // Assuming ID is a String

    public AuthResponse(String role, String id) {
        this.role = role;
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public String getId() {
        return id;
    }

}
