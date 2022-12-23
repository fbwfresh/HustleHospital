package com.kenzie.appserver.service.model;

import java.util.*;
public class Doctor {
    private String name;
    private String doctorId;
    private String dob;
    private boolean isActive;
    //private List<Patient> patientList;

    public Doctor(String name,String dob, boolean isActive){
        this.name = name;
        this.dob = dob;
        doctorId = UUID.randomUUID().toString();
        this.isActive = isActive;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public String getDob() {
        return dob;
    }
    public void setDoctorId(String doctorId){
        this.doctorId = doctorId;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

}
