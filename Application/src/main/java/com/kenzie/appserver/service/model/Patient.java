package com.kenzie.appserver.service.model;

import static java.util.UUID.randomUUID;

public class Patient {
    private final String patientId;
    private final String name;
    private final String dob;
    private final boolean insurance;

    public Patient(String patientId, String name, String dob, boolean insurance) {
//        this.patientId = randomUUID().toString();
        this.patientId = patientId;
        this.name = name;
        this.dob = dob;
        this.insurance = insurance;
    }

    public String getPatientId() {
        return patientId;
    }

    public String getName() {
        return name;
    }

    public String getDob() {
        return dob;
    }

    public boolean isInsurance() {
        return insurance;
    }
}
