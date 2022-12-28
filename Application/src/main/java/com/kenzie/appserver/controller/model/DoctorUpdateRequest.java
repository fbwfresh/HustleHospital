package com.kenzie.appserver.controller.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

public class DoctorUpdateRequest {

    @NotEmpty
    @JsonProperty("doctorId")
    private String doctorId;

    @NotEmpty
    @JsonProperty("name")
    private String name;

    @JsonProperty("dob")
    private String dob;


    @JsonProperty("isActive")
    private boolean isActive;

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
