package com.kenzie.appserver.service.model;

import java.util.*;
public class Doctor {
    private String name;
    private String doctorId;
    private String dob;
    private boolean isActive;
  //  private List<Patient> patientList = new ArrayList<>();
// thinking about making adding the doctorId to this and also in the controller method having the random UUID in case the doctorId isnt creataed in the constructor
  //public Doctor(String doctorId, String name, String dob) {

    public Doctor( String name,String dob){
        this.name = name;
        this.dob = dob;
        this.doctorId = UUID.randomUUID().toString();
        this.isActive = true;
    }

    public Doctor(String name, String dob, String doctorId, boolean isActive){
        this.name = name;
        this.dob = dob;
        this.doctorId = doctorId;
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
